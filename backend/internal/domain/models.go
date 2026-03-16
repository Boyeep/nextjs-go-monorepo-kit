package domain

import "time"

type HealthStatus struct {
	Name      string    `json:"name"`
	Env       string    `json:"env"`
	Version   string    `json:"version"`
	Database  string    `json:"database"`
	Timestamp time.Time `json:"timestamp"`
}

type Resource struct {
	ID               string    `json:"id"`
	OwnerID          string    `json:"owner_id"`
	Slug             string    `json:"slug"`
	Title            string    `json:"title"`
	Description      string    `json:"description"`
	Visibility       string    `json:"visibility"`
	Status           string    `json:"status"`
	Locale           string    `json:"locale"`
	EntryCount       int       `json:"entry_count"`
	EstimatedMinutes int       `json:"estimated_minutes"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type Entry struct {
	ID         string    `json:"id"`
	ResourceID string    `json:"resource_id"`
	Position   int       `json:"position"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	Details    string    `json:"details,omitempty"`
	Notes      string    `json:"notes,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type User struct {
	ID           string     `json:"id"`
	Username     string     `json:"username"`
	Email        string     `json:"email"`
	FullName     string     `json:"full_name,omitempty"`
	Role         string     `json:"role"`
	Status       string     `json:"status"`
	LastLoginAt  *time.Time `json:"last_login_at,omitempty"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	PasswordHash string     `json:"-"`
}

type RegisterInput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	FullName string `json:"full_name"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ForgotPasswordInput struct {
	Email string `json:"email"`
}

type ResetPasswordInput struct {
	Token    string `json:"token"`
	Password string `json:"password"`
}

type VerifyEmailInput struct {
	Token string `json:"token"`
}

type ResendVerificationInput struct {
	Email string `json:"email"`
}

type AuthResponse struct {
	AccessToken string    `json:"access_token"`
	TokenType   string    `json:"token_type"`
	ExpiresAt   time.Time `json:"expires_at"`
	User        User      `json:"user"`
}

type RegisterResponse struct {
	Message string `json:"message"`
	User    User   `json:"user"`
}

type AnalyticsOverview struct {
	Visitors      int64  `json:"visitors"`
	Pageviews     int64  `json:"pageviews"`
	ViewsPerVisit string `json:"views_per_visit"`
	BounceRate    string `json:"bounce_rate"`
	VisitDuration string `json:"visit_duration"`
	DateRange     string `json:"date_range"`
	Source        string `json:"source"`
}
