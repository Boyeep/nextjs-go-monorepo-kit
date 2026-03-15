package service

import (
	"bytes"
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"net/url"
	"strings"
	"time"

	"github.com/example/learning-platform-backend-template/internal/config"
	"github.com/example/learning-platform-backend-template/internal/domain"
	"github.com/example/learning-platform-backend-template/internal/repository"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrInvalidInput       = errors.New("invalid input")
	ErrUnauthorized       = errors.New("unauthorized")
	ErrEmailNotVerified   = errors.New("email not verified")
)

type AuthService struct {
	cfg   config.Config
	users repository.UserRepository
}

func NewAuthService(cfg config.Config, users repository.UserRepository) AuthService {
	return AuthService{
		cfg:   cfg,
		users: users,
	}
}

func (s AuthService) Register(ctx context.Context, input domain.RegisterInput) (domain.RegisterResponse, error) {
	input.Username = strings.TrimSpace(input.Username)
	input.Email = strings.TrimSpace(strings.ToLower(input.Email))
	input.FullName = strings.TrimSpace(input.FullName)

	if input.Username == "" || input.Email == "" || len(input.Password) < 8 {
		return domain.RegisterResponse{}, ErrInvalidInput
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return domain.RegisterResponse{}, err
	}

	user, err := s.users.Create(ctx, input, string(passwordHash))
	if err != nil {
		return domain.RegisterResponse{}, err
	}

	expiresAt := time.Now().UTC().Add(24 * time.Hour)
	token, tokenHash, err := generateResetToken()
	if err != nil {
		return domain.RegisterResponse{}, err
	}

	if err := s.users.DeleteActiveEmailVerificationTokensByUserID(ctx, user.ID); err != nil {
		return domain.RegisterResponse{}, err
	}

	if err := s.users.CreateEmailVerificationToken(ctx, user.ID, tokenHash, expiresAt); err != nil {
		return domain.RegisterResponse{}, err
	}

	verifyURL, err := s.buildVerificationURL(token)
	if err != nil {
		return domain.RegisterResponse{}, err
	}

	if err := s.sendVerificationEmail(user.Email, verifyURL, expiresAt); err != nil {
		log.Printf("failed to send verification email during signup for %s: %v", user.Email, err)
	}

	user.PasswordHash = ""

	return domain.RegisterResponse{
		Message: "Please verify your email before logging in. If the email does not arrive, use resend verification on the confirm-email page.",
		User:    user,
	}, nil
}

func (s AuthService) Login(ctx context.Context, input domain.LoginInput) (domain.AuthResponse, error) {
	input.Email = strings.TrimSpace(strings.ToLower(input.Email))

	if input.Email == "" || input.Password == "" {
		return domain.AuthResponse{}, ErrInvalidInput
	}

	user, err := s.users.FindByEmail(ctx, input.Email)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			return domain.AuthResponse{}, ErrInvalidCredentials
		}
		return domain.AuthResponse{}, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
		return domain.AuthResponse{}, ErrInvalidCredentials
	}

	if user.Status != "active" {
		return domain.AuthResponse{}, ErrEmailNotVerified
	}

	if err := s.users.UpdateLastLogin(ctx, user.ID); err != nil {
		return domain.AuthResponse{}, err
	}

	refreshedUser, err := s.users.FindByID(ctx, user.ID)
	if err != nil {
		return domain.AuthResponse{}, err
	}

	return s.buildAuthResponse(refreshedUser)
}

func (s AuthService) Me(ctx context.Context, userID string) (domain.User, error) {
	return s.users.FindByID(ctx, userID)
}

func (s AuthService) ForgotPassword(ctx context.Context, input domain.ForgotPasswordInput) error {
	input.Email = strings.TrimSpace(strings.ToLower(input.Email))
	if input.Email == "" {
		return ErrInvalidInput
	}

	user, err := s.users.FindByEmail(ctx, input.Email)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			return nil
		}
		return err
	}

	token, tokenHash, err := generateResetToken()
	if err != nil {
		return err
	}

	expiresAt := time.Now().UTC().Add(30 * time.Minute)
	if err := s.users.DeleteActivePasswordResetTokensByUserID(ctx, user.ID); err != nil {
		return err
	}

	if err := s.users.CreatePasswordResetToken(ctx, user.ID, tokenHash, expiresAt); err != nil {
		return err
	}

	resetURL, err := s.buildResetURL(token)
	if err != nil {
		return err
	}

	return s.sendPasswordResetEmail(user.Email, resetURL, expiresAt)
}

func (s AuthService) ResetPassword(ctx context.Context, input domain.ResetPasswordInput) error {
	input.Token = strings.TrimSpace(input.Token)
	if input.Token == "" || len(input.Password) < 8 {
		return ErrInvalidInput
	}

	tokenHash := hashResetToken(input.Token)
	resetToken, err := s.users.FindActivePasswordResetTokenByHash(ctx, tokenHash)
	if err != nil {
		if errors.Is(err, repository.ErrPasswordResetTokenNotFound) {
			return ErrInvalidCredentials
		}
		return err
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	if err := s.users.UpdatePasswordHash(ctx, resetToken.UserID, string(passwordHash)); err != nil {
		return err
	}

	if err := s.users.MarkPasswordResetTokenUsed(ctx, resetToken.ID); err != nil {
		return err
	}

	return s.users.DeleteActivePasswordResetTokensByUserID(ctx, resetToken.UserID)
}

func (s AuthService) VerifyEmail(ctx context.Context, input domain.VerifyEmailInput) error {
	input.Token = strings.TrimSpace(input.Token)
	if input.Token == "" {
		return ErrInvalidInput
	}

	tokenHash := hashResetToken(input.Token)
	verificationToken, err := s.users.FindActiveEmailVerificationTokenByHash(ctx, tokenHash)
	if err != nil {
		if errors.Is(err, repository.ErrEmailVerificationTokenNotFound) {
			return ErrInvalidCredentials
		}
		return err
	}

	if err := s.users.MarkUserEmailVerified(ctx, verificationToken.UserID); err != nil {
		return err
	}

	return s.users.MarkEmailVerificationTokenUsed(ctx, verificationToken.ID)
}

func (s AuthService) ResendVerificationEmail(ctx context.Context, input domain.ResendVerificationInput) error {
	input.Email = strings.TrimSpace(strings.ToLower(input.Email))
	if input.Email == "" {
		return ErrInvalidInput
	}

	user, err := s.users.FindByEmail(ctx, input.Email)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			return nil
		}
		return err
	}

	if user.Status == "active" {
		return nil
	}

	token, tokenHash, err := generateResetToken()
	if err != nil {
		return err
	}

	expiresAt := time.Now().UTC().Add(24 * time.Hour)
	if err := s.users.DeleteActiveEmailVerificationTokensByUserID(ctx, user.ID); err != nil {
		return err
	}

	if err := s.users.CreateEmailVerificationToken(ctx, user.ID, tokenHash, expiresAt); err != nil {
		return err
	}

	verifyURL, err := s.buildVerificationURL(token)
	if err != nil {
		return err
	}

	return s.sendVerificationEmail(user.Email, verifyURL, expiresAt)
}

func (s AuthService) ParseAccessToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidCredentials
		}
		return []byte(s.cfg.JWT.AccessSecret), nil
	})
	if err != nil {
		return "", ErrInvalidCredentials
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return "", ErrInvalidCredentials
	}

	subject, ok := claims["sub"].(string)
	if !ok || subject == "" {
		return "", ErrInvalidCredentials
	}

	return subject, nil
}

func (s AuthService) buildAuthResponse(user domain.User) (domain.AuthResponse, error) {
	expiresAt := time.Now().UTC().Add(time.Duration(s.cfg.JWT.AccessTTLMinutes) * time.Minute)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   expiresAt.Unix(),
		"iat":   time.Now().UTC().Unix(),
	})

	signedToken, err := token.SignedString([]byte(s.cfg.JWT.AccessSecret))
	if err != nil {
		return domain.AuthResponse{}, err
	}

	user.PasswordHash = ""

	return domain.AuthResponse{
		AccessToken: signedToken,
		TokenType:   "Bearer",
		ExpiresAt:   expiresAt,
		User:        user,
	}, nil
}

func generateResetToken() (string, string, error) {
	randomBytes := make([]byte, 32)
	if _, err := rand.Read(randomBytes); err != nil {
		return "", "", err
	}

	token := hex.EncodeToString(randomBytes)
	return token, hashResetToken(token), nil
}

func hashResetToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}

func (s AuthService) buildResetURL(token string) (string, error) {
	baseURL := strings.TrimRight(strings.TrimSpace(s.cfg.App.FrontendURL), "/")
	if baseURL == "" {
		return "", fmt.Errorf("frontend app url is not configured")
	}

	parsedURL, err := url.Parse(baseURL + "/create-new-password")
	if err != nil {
		return "", err
	}

	query := parsedURL.Query()
	query.Set("token", token)
	parsedURL.RawQuery = query.Encode()
	return parsedURL.String(), nil
}

func (s AuthService) buildVerificationURL(token string) (string, error) {
	baseURL := strings.TrimRight(strings.TrimSpace(s.cfg.App.FrontendURL), "/")
	if baseURL == "" {
		return "", fmt.Errorf("frontend app url is not configured")
	}

	parsedURL, err := url.Parse(baseURL + "/verify-email")
	if err != nil {
		return "", err
	}

	query := parsedURL.Query()
	query.Set("token", token)
	parsedURL.RawQuery = query.Encode()
	return parsedURL.String(), nil
}

func (s AuthService) sendPasswordResetEmail(recipient, resetURL string, expiresAt time.Time) error {
	if strings.TrimSpace(s.cfg.Mail.ResendAPIKey) != "" {
		return s.sendEmailViaResend(
			recipient,
			"Reset your account password",
			fmt.Sprintf(
				"<p>We received a request to reset your account password.</p><p><a href=\"%s\">Open this link to choose a new password</a></p><p>This link expires at %s.</p><p>If you did not request this, you can ignore this email.</p>",
				resetURL,
				expiresAt.Format(time.RFC1123),
			),
		)
	}

	if strings.TrimSpace(s.cfg.Mail.SMTPHost) == "" {
		log.Printf("password reset requested for %s: %s (expires %s)", recipient, resetURL, expiresAt.Format(time.RFC3339))
		return nil
	}

	address := fmt.Sprintf("%s:%d", s.cfg.Mail.SMTPHost, s.cfg.Mail.SMTPPort)
	auth := smtp.PlainAuth("", s.cfg.Mail.SMTPUser, s.cfg.Mail.SMTPPass, s.cfg.Mail.SMTPHost)
	message := strings.Join([]string{
		fmt.Sprintf("From: %s", s.cfg.Mail.From),
		fmt.Sprintf("To: %s", recipient),
		"Subject: Reset your account password",
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=UTF-8",
		"",
		"We received a request to reset your account password.",
		"",
		fmt.Sprintf("Open this link to choose a new password: %s", resetURL),
		fmt.Sprintf("This link expires at %s.", expiresAt.Format(time.RFC1123)),
		"",
		"If you did not request this, you can ignore this email.",
	}, "\r\n")

	return smtp.SendMail(address, auth, s.cfg.Mail.From, []string{recipient}, []byte(message))
}

func (s AuthService) sendVerificationEmail(recipient, verifyURL string, expiresAt time.Time) error {
	if strings.TrimSpace(s.cfg.Mail.ResendAPIKey) != "" {
		return s.sendEmailViaResend(
			recipient,
			"Verify your account",
			fmt.Sprintf(
				"<p>Welcome.</p><p><a href=\"%s\">Click here to verify your email address</a></p><p>This verification link expires at %s.</p>",
				verifyURL,
				expiresAt.Format(time.RFC1123),
			),
		)
	}

	if strings.TrimSpace(s.cfg.Mail.SMTPHost) == "" {
		log.Printf("email verification requested for %s: %s (expires %s)", recipient, verifyURL, expiresAt.Format(time.RFC3339))
		return nil
	}

	address := fmt.Sprintf("%s:%d", s.cfg.Mail.SMTPHost, s.cfg.Mail.SMTPPort)
	auth := smtp.PlainAuth("", s.cfg.Mail.SMTPUser, s.cfg.Mail.SMTPPass, s.cfg.Mail.SMTPHost)
	message := strings.Join([]string{
		fmt.Sprintf("From: %s", s.cfg.Mail.From),
		fmt.Sprintf("To: %s", recipient),
		"Subject: Verify your account",
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=UTF-8",
		"",
		"Welcome.",
		"",
		fmt.Sprintf("Open this link to verify your email address: %s", verifyURL),
		fmt.Sprintf("This link expires at %s.", expiresAt.Format(time.RFC1123)),
	}, "\r\n")

	return smtp.SendMail(address, auth, s.cfg.Mail.From, []string{recipient}, []byte(message))
}

func (s AuthService) sendEmailViaResend(recipient, subject, html string) error {
	payload := map[string]any{
		"from":    s.cfg.Mail.From,
		"to":      []string{recipient},
		"subject": subject,
		"html":    html,
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, "https://api.resend.com/emails", bytes.NewReader(body))
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+s.cfg.Mail.ResendAPIKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 15 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("resend api returned status %d", resp.StatusCode)
	}

	return nil
}

