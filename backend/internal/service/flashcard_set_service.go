package service

import (
	"context"
	"strings"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/repository"
)

type ResourceService struct {
	repository repository.ResourceRepository
}

func NewResourceService(repository repository.ResourceRepository) ResourceService {
	return ResourceService{repository: repository}
}

func (s ResourceService) ListPublic(ctx context.Context) ([]domain.Resource, error) {
	return s.repository.ListPublic(ctx)
}

func (s ResourceService) GetBySlug(ctx context.Context, slug string) (domain.Resource, error) {
	return s.repository.FindBySlug(ctx, strings.TrimSpace(slug))
}
