package service

import (
	"context"
	"strings"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/repository"
)

type EntryService struct {
	repository repository.EntryRepository
}

func NewEntryService(repository repository.EntryRepository) EntryService {
	return EntryService{repository: repository}
}

func (s EntryService) ListPublicByResourceSlug(ctx context.Context, resourceSlug string) ([]domain.Entry, error) {
	return s.repository.ListPublicByResourceSlug(ctx, strings.TrimSpace(resourceSlug))
}
