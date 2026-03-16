package repository

import (
	"context"
	"errors"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	ErrResourceNotFound = errors.New("resource not found")
)

type ResourceRepository struct {
	db *pgxpool.Pool
}

func NewResourceRepository(db *pgxpool.Pool) ResourceRepository {
	return ResourceRepository{db: db}
}

func (r ResourceRepository) ListPublic(ctx context.Context) ([]domain.Resource, error) {
	query := `
		SELECT id, owner_id, slug, title, description, visibility, status, locale, entry_count, COALESCE(estimated_minutes, 0), created_at, updated_at
		FROM resources
		WHERE visibility = 'public' AND status = 'published'
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return scanResources(rows)
}

func (r ResourceRepository) FindBySlug(ctx context.Context, slug string) (domain.Resource, error) {
	query := `
		SELECT id, owner_id, slug, title, description, visibility, status, locale, entry_count, COALESCE(estimated_minutes, 0), created_at, updated_at
		FROM resources
		WHERE slug = $1
	`

	item, err := scanResource(r.db.QueryRow(ctx, query, slug))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return domain.Resource{}, ErrResourceNotFound
		}
		return domain.Resource{}, err
	}

	return item, nil
}

type resourceScanner interface {
	Scan(dest ...any) error
}

func scanResource(scanner resourceScanner) (domain.Resource, error) {
	var item domain.Resource
	var description *string

	err := scanner.Scan(
		&item.ID,
		&item.OwnerID,
		&item.Slug,
		&item.Title,
		&description,
		&item.Visibility,
		&item.Status,
		&item.Locale,
		&item.EntryCount,
		&item.EstimatedMinutes,
		&item.CreatedAt,
		&item.UpdatedAt,
	)
	if err != nil {
		return domain.Resource{}, err
	}

	if description != nil {
		item.Description = *description
	}

	return item, nil
}

func scanResources(rows pgx.Rows) ([]domain.Resource, error) {
	items := make([]domain.Resource, 0)
	for rows.Next() {
		item, err := scanResource(rows)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return items, nil
}
