package http

import (
	"errors"
	"net/http"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/repository"
	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/service"
)

type ResourceHandler struct {
	service service.ResourceService
}

func NewResourceHandler(service service.ResourceService) ResourceHandler {
	return ResourceHandler{service: service}
}

func (h ResourceHandler) List(w http.ResponseWriter, r *http.Request) {
	items, err := h.service.ListPublic(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to load resources")
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": items})
}

func (h ResourceHandler) Get(w http.ResponseWriter, r *http.Request) {
	item, err := h.service.GetBySlug(r.Context(), r.PathValue("slug"))
	if err != nil {
		if errors.Is(err, repository.ErrResourceNotFound) {
			writeError(w, http.StatusNotFound, "resource not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to load resource")
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": item})
}
