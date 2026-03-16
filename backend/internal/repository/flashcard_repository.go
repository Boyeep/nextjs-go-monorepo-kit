package repository

import (
	"context"
	"strings"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type EntryRepository struct {
	db *pgxpool.Pool
}

func NewEntryRepository(db *pgxpool.Pool) EntryRepository {
	return EntryRepository{db: db}
}

func (r EntryRepository) ListPublicByResourceSlug(ctx context.Context, resourceSlug string) ([]domain.Entry, error) {
	query := `
		SELECT e.id, e.resource_id, e.position, e.title, e.content, e.details, e.notes, e.created_at, e.updated_at
		FROM entries e
		INNER JOIN resources r ON r.id = e.resource_id
		WHERE r.slug = $1 AND r.visibility = 'public' AND r.status = 'published'
		ORDER BY e.position ASC, e.created_at ASC
	`

	rows, err := r.db.Query(ctx, query, strings.TrimSpace(resourceSlug))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return scanEntries(rows)
}

type entryScanner interface {
	Scan(dest ...any) error
}

func scanEntry(scanner entryScanner) (domain.Entry, error) {
	var item domain.Entry
	var details *string
	var notes *string

	err := scanner.Scan(
		&item.ID,
		&item.ResourceID,
		&item.Position,
		&item.Title,
		&item.Content,
		&details,
		&notes,
		&item.CreatedAt,
		&item.UpdatedAt,
	)
	if err != nil {
		return domain.Entry{}, err
	}

	if details != nil {
		item.Details = *details
	}
	if notes != nil {
		item.Notes = *notes
	}

	return item, nil
}

func scanEntries(rows pgx.Rows) ([]domain.Entry, error) {
	items := make([]domain.Entry, 0)
	for rows.Next() {
		item, err := scanEntry(rows)
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
