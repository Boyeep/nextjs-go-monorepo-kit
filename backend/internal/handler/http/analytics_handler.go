package http

import (
	"errors"
	"net/http"

	"github.com/example/learning-platform-backend-template/internal/service"
)

type AnalyticsHandler struct {
	service service.AnalyticsService
}

func NewAnalyticsHandler(service service.AnalyticsService) AnalyticsHandler {
	return AnalyticsHandler{service: service}
}

func (h AnalyticsHandler) Overview(w http.ResponseWriter, r *http.Request) {
	overview, err := h.service.GetOverview(r.Context())
	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusNotImplemented, "analytics provider is not configured")
		default:
			writeError(w, http.StatusBadGateway, "failed to load analytics overview")
		}
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": overview})
}

