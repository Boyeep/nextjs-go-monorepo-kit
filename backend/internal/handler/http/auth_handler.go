package http

import (
	"errors"
	"net/http"

	"github.com/example/learning-platform-backend-template/internal/domain"
	"github.com/example/learning-platform-backend-template/internal/repository"
	"github.com/example/learning-platform-backend-template/internal/service"
)

type AuthHandler struct {
	service service.AuthService
}

func NewAuthHandler(service service.AuthService) AuthHandler {
	return AuthHandler{service: service}
}

func (h AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var input domain.RegisterInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	response, err := h.service.Register(r.Context(), input)
	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "username, email, and password must be valid")
		case errors.Is(err, repository.ErrUserConflict):
			writeError(w, http.StatusConflict, "user already exists")
		default:
			writeError(w, http.StatusInternalServerError, "failed to register user")
		}
		return
	}

	writeJSON(w, http.StatusCreated, response)
}

func (h AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var input domain.LoginInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	response, err := h.service.Login(r.Context(), input)
	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "email and password are required")
		case errors.Is(err, service.ErrInvalidCredentials):
			writeError(w, http.StatusUnauthorized, "invalid email or password")
		case errors.Is(err, service.ErrEmailNotVerified):
			writeError(w, http.StatusForbidden, "please verify your email before logging in")
		default:
			writeError(w, http.StatusInternalServerError, "failed to login")
		}
		return
	}

	writeJSON(w, http.StatusOK, response)
}

func (h AuthHandler) ForgotPassword(w http.ResponseWriter, r *http.Request) {
	var input domain.ForgotPasswordInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := h.service.ForgotPassword(r.Context(), input); err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "email is required")
		default:
			writeError(w, http.StatusInternalServerError, "failed to process password reset request")
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h AuthHandler) VerifyEmail(w http.ResponseWriter, r *http.Request) {
	var input domain.VerifyEmailInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := h.service.VerifyEmail(r.Context(), input); err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "verification token is required")
		case errors.Is(err, service.ErrInvalidCredentials):
			writeError(w, http.StatusUnauthorized, "invalid or expired verification token")
		default:
			writeError(w, http.StatusInternalServerError, "failed to verify email")
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h AuthHandler) ResendVerificationEmail(w http.ResponseWriter, r *http.Request) {
	var input domain.ResendVerificationInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := h.service.ResendVerificationEmail(r.Context(), input); err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "email is required")
		default:
			writeError(w, http.StatusInternalServerError, "failed to resend verification email")
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h AuthHandler) ResetPassword(w http.ResponseWriter, r *http.Request) {
	var input domain.ResetPasswordInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := h.service.ResetPassword(r.Context(), input); err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "token and a password with at least 8 characters are required")
		case errors.Is(err, service.ErrInvalidCredentials):
			writeError(w, http.StatusUnauthorized, "invalid or expired reset token")
		default:
			writeError(w, http.StatusInternalServerError, "failed to reset password")
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "missing authenticated user")
		return
	}

	user, err := h.service.Me(r.Context(), userID)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			writeError(w, http.StatusUnauthorized, "user no longer exists")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to load user")
		return
	}

	user.PasswordHash = ""
	writeJSON(w, http.StatusOK, map[string]any{"data": user})
}

