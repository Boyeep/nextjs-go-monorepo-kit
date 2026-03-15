package server

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"slices"
	"strings"
	"time"

	"github.com/example/learning-platform-backend-template/internal/config"
	httpHandler "github.com/example/learning-platform-backend-template/internal/handler/http"
	"github.com/example/learning-platform-backend-template/internal/repository"
	"github.com/example/learning-platform-backend-template/internal/service"
	"github.com/jackc/pgx/v5/pgxpool"
)

func NewRouter(cfg config.Config, db *pgxpool.Pool) http.Handler {
	mux := http.NewServeMux()

	userRepository := repository.NewUserRepository(db)
	resourceRepository := repository.NewResourceRepository(db)
	entryRepository := repository.NewEntryRepository(db)

	healthService := service.NewHealthService(cfg, db)
	collectionService := service.NewCollectionService()
	authService := service.NewAuthService(cfg, userRepository)
	analyticsService := service.NewAnalyticsService(cfg)
	resourceService := service.NewResourceService(resourceRepository)
	entryService := service.NewEntryService(entryRepository)

	healthHandler := httpHandler.NewHealthHandler(healthService)
	collectionHandler := httpHandler.NewCollectionHandler(collectionService)
	authHandler := httpHandler.NewAuthHandler(authService)
	analyticsHandler := httpHandler.NewAnalyticsHandler(analyticsService)
	resourceHandler := httpHandler.NewResourceHandler(resourceService)
	entryHandler := httpHandler.NewEntryHandler(entryService)

	mux.HandleFunc("GET /health", healthHandler.Get)
	mux.HandleFunc("GET /api/v1/collections", collectionHandler.List)
	mux.HandleFunc("POST /api/v1/auth/register", authHandler.Register)
	mux.HandleFunc("POST /api/v1/auth/login", authHandler.Login)
	mux.HandleFunc("POST /api/v1/auth/verify-email", authHandler.VerifyEmail)
	mux.HandleFunc("POST /api/v1/auth/resend-verification", authHandler.ResendVerificationEmail)
	mux.HandleFunc("POST /api/v1/auth/forgot-password", authHandler.ForgotPassword)
	mux.HandleFunc("POST /api/v1/auth/reset-password", authHandler.ResetPassword)
	mux.Handle("GET /api/v1/auth/me", authMiddleware(authService, http.HandlerFunc(authHandler.Me)))
	mux.Handle(
		"GET /api/v1/analytics/overview",
		authMiddleware(authService, ownerOnlyMiddleware(cfg, userRepository, http.HandlerFunc(analyticsHandler.Overview))),
	)
	mux.HandleFunc("GET /api/v1/resources", resourceHandler.List)
	mux.HandleFunc("GET /api/v1/resources/{slug}", resourceHandler.Get)
	mux.HandleFunc("GET /api/v1/resources/{slug}/entries", entryHandler.ListByResource)
	mux.Handle("POST /api/v1/resources", authMiddleware(authService, http.HandlerFunc(resourceHandler.Create)))
	mux.Handle("PATCH /api/v1/resources/{slug}", authMiddleware(authService, http.HandlerFunc(resourceHandler.Update)))
	mux.Handle("DELETE /api/v1/resources/{slug}", authMiddleware(authService, http.HandlerFunc(resourceHandler.Delete)))
	mux.Handle("POST /api/v1/resources/{slug}/entries", authMiddleware(authService, http.HandlerFunc(entryHandler.Create)))
	mux.Handle("PATCH /api/v1/entries/{id}", authMiddleware(authService, http.HandlerFunc(entryHandler.Update)))
	mux.Handle("DELETE /api/v1/entries/{id}", authMiddleware(authService, http.HandlerFunc(entryHandler.Delete)))

	return withCORS(cfg, withSecurityHeaders(withRequestID(withLogging(mux))))
}

func withSecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("Cross-Origin-Opener-Policy", "same-origin")
		next.ServeHTTP(w, r)
	})
}

func withRequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := r.Header.Get("X-Request-ID")
		if strings.TrimSpace(requestID) == "" {
			requestID = randomID()
		}

		w.Header().Set("X-Request-ID", requestID)
		next.ServeHTTP(w, r)
	})
}

func randomID() string {
	buffer := make([]byte, 8)
	if _, err := rand.Read(buffer); err != nil {
		return fmt.Sprintf("req-%d", time.Now().UnixNano())
	}

	return hex.EncodeToString(buffer)
}

func ownerOnlyMiddleware(cfg config.Config, users repository.UserRepository, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if cfg.Analytics.DashboardOwnerEmail == "" {
			httpHandler.WriteErrorPublic(w, http.StatusForbidden, "dashboard owner email is not configured")
			return
		}

		userID, ok := httpHandler.UserIDFromContext(r.Context())
		if !ok {
			httpHandler.WriteErrorPublic(w, http.StatusUnauthorized, "missing authenticated user")
			return
		}

		user, err := users.FindByID(r.Context(), userID)
		if err != nil {
			httpHandler.WriteErrorPublic(w, http.StatusUnauthorized, "user no longer exists")
			return
		}

		if strings.ToLower(strings.TrimSpace(user.Email)) != cfg.Analytics.DashboardOwnerEmail {
			httpHandler.WriteErrorPublic(w, http.StatusForbidden, "dashboard access is restricted")
			return
		}

		next.ServeHTTP(w, r)
	})
}

func withLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %s request_id=%s", r.Method, r.URL.Path, time.Since(start), w.Header().Get("X-Request-ID"))
	})
}

func withCORS(cfg config.Config, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := strings.TrimSpace(r.Header.Get("Origin"))
		if origin != "" && slices.Contains(cfg.App.CORS.AllowedOrigins, origin) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
		}
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func authMiddleware(authService service.AuthService, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			_ = json.NewEncoder(w).Encode(httpHandler.ErrorResponse{Error: "missing authorization header"})
			return
		}

		const prefix = "Bearer "
		if !strings.HasPrefix(authHeader, prefix) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			_ = json.NewEncoder(w).Encode(httpHandler.ErrorResponse{Error: "invalid authorization scheme"})
			return
		}

		userID, err := authService.ParseAccessToken(strings.TrimPrefix(authHeader, prefix))
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			_ = json.NewEncoder(w).Encode(httpHandler.ErrorResponse{Error: "invalid access token"})
			return
		}

		next.ServeHTTP(w, r.WithContext(httpHandler.ContextWithUserID(r.Context(), userID)))
	})
}
