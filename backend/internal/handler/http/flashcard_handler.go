package http

import (
	"net/http"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/service"
)

type EntryHandler struct {
	service service.EntryService
}

func NewEntryHandler(service service.EntryService) EntryHandler {
	return EntryHandler{service: service}
}

func (h EntryHandler) ListByResource(w http.ResponseWriter, r *http.Request) {
	items, err := h.service.ListPublicByResourceSlug(r.Context(), r.PathValue("slug"))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to load entries")
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": items})
}
