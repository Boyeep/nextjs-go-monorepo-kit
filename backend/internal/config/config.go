package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	App       AppConfig
	DB        DBConfig
	JWT       JWTConfig
	Mail      MailConfig
	Analytics AnalyticsConfig
	Demo      DemoConfig
}

type AppConfig struct {
	Name        string
	Env         string
	Host        string
	Port        int
	BaseURL     string
	FrontendURL string
	Version     string
	CORS        CORSConfig
}

type CORSConfig struct {
	AllowedOrigins []string
}

type DBConfig struct {
	URL      string
	Host     string
	Port     int
	Name     string
	User     string
	Password string
	SSLMode  string
	Schema   string
}

type JWTConfig struct {
	AccessSecret     string
	RefreshSecret    string
	AccessTTLMinutes int
	RefreshTTLHours  int
}

type MailConfig struct {
	From         string
	ResendAPIKey string
	SMTPHost     string
	SMTPPort     int
	SMTPUser     string
	SMTPPass     string
}

type AnalyticsConfig struct {
	Provider            string
	DashboardOwnerEmail string
	PlausibleBaseURL    string
	PlausibleSiteID     string
	PlausibleAPIToken   string
}

type DemoConfig struct {
	SeedEnabled bool
	Email       string
	Password    string
	Username    string
	FullName    string
}

func Load() Config {
	return Config{
		App: AppConfig{
			Name:        getEnv("APP_NAME", "Next.js Go Monorepo Kit API"),
			Env:         getEnv("APP_ENV", "development"),
			Host:        getEnv("APP_HOST", "0.0.0.0"),
			Port:        getPort(),
			BaseURL:     getEnv("APP_BASE_URL", "http://localhost:8080"),
			FrontendURL: getEnv("FRONTEND_APP_URL", "http://localhost:3000"),
			Version:     getEnv("APP_VERSION", "0.1.0"),
			CORS: CORSConfig{
				AllowedOrigins: getEnvAsSlice(
					"CORS_ALLOWED_ORIGINS",
					[]string{"http://localhost:3000"},
				),
			},
		},
		DB: DBConfig{
			URL:      getEnv("DATABASE_URL", ""),
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnvAsInt("DB_PORT", 5432),
			Name:     getEnv("DB_NAME", "app_db"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "postgres"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
			Schema:   getEnv("DB_SCHEMA", "public"),
		},
		JWT: JWTConfig{
			AccessSecret:     getEnv("JWT_ACCESS_SECRET", "change-me-access"),
			RefreshSecret:    getEnv("JWT_REFRESH_SECRET", "change-me-refresh"),
			AccessTTLMinutes: getEnvAsInt("JWT_ACCESS_TTL_MINUTES", 15),
			RefreshTTLHours:  getEnvAsInt("JWT_REFRESH_TTL_HOURS", 720),
		},
		Mail: MailConfig{
			From:         getEnv("MAIL_FROM", "noreply@example.local"),
			ResendAPIKey: getEnv("RESEND_API_KEY", ""),
			SMTPHost:     getEnv("SMTP_HOST", ""),
			SMTPPort:     getEnvAsInt("SMTP_PORT", 587),
			SMTPUser:     getEnv("SMTP_USER", ""),
			SMTPPass:     getEnv("SMTP_PASS", ""),
		},
		Analytics: AnalyticsConfig{
			Provider:            strings.ToLower(getEnv("ANALYTICS_PROVIDER", "")),
			DashboardOwnerEmail: strings.ToLower(strings.TrimSpace(getEnv("DASHBOARD_OWNER_EMAIL", ""))),
			PlausibleBaseURL:    getEnv("PLAUSIBLE_BASE_URL", "https://plausible.io"),
			PlausibleSiteID:     getEnv("PLAUSIBLE_SITE_ID", ""),
			PlausibleAPIToken:   getEnv("PLAUSIBLE_API_TOKEN", ""),
		},
		Demo: DemoConfig{
			SeedEnabled: getEnvAsBool("DEMO_SEED_ENABLED", false),
			Email:       strings.ToLower(strings.TrimSpace(getEnv("DEMO_USER_EMAIL", "demo@nextjs-go-kit.local"))),
			Password:    getEnv("DEMO_USER_PASSWORD", "demo12345"),
			Username:    strings.TrimSpace(getEnv("DEMO_USER_USERNAME", "nextjs-go-demo")),
			FullName:    strings.TrimSpace(getEnv("DEMO_USER_FULL_NAME", "Next.js Go Demo")),
		},
	}
}

func (c Config) Address() string {
	return fmt.Sprintf("%s:%d", c.App.Host, c.App.Port)
}

func (c Config) DatabaseURL() string {
	if strings.TrimSpace(c.DB.URL) != "" {
		return c.DB.URL
	}

	return fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=%s&search_path=%s",
		c.DB.User,
		c.DB.Password,
		c.DB.Host,
		c.DB.Port,
		c.DB.Name,
		c.DB.SSLMode,
		c.DB.Schema,
	)
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}

	return value
}

func getEnvAsInt(key string, fallback int) int {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}

	parsed, err := strconv.Atoi(value)
	if err != nil {
		return fallback
	}

	return parsed
}

func getPort() int {
	if value := os.Getenv("APP_PORT"); value != "" {
		return getEnvAsInt("APP_PORT", 8080)
	}
	return getEnvAsInt("PORT", 8080)
}

func getEnvAsSlice(key string, fallback []string) []string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}

	parts := strings.Split(value, ",")
	items := make([]string, 0, len(parts))
	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed != "" {
			items = append(items, trimmed)
		}
	}

	if len(items) == 0 {
		return fallback
	}

	return items
}

func getEnvAsBool(key string, fallback bool) bool {
	value := strings.TrimSpace(strings.ToLower(os.Getenv(key)))
	if value == "" {
		return fallback
	}

	switch value {
	case "1", "true", "yes", "y", "on":
		return true
	case "0", "false", "no", "n", "off":
		return false
	default:
		return fallback
	}
}
