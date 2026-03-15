package repository

import (
	"context"
	"fmt"
	"strings"

	"github.com/example/learning-platform-backend-template/internal/config"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

func SeedDemoData(ctx context.Context, db *pgxpool.Pool, cfg config.Config) error {
	if !cfg.Demo.SeedEnabled {
		return nil
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(cfg.Demo.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("hash demo password: %w", err)
	}

	tx, err := db.Begin(ctx)
	if err != nil {
		return err
	}
	defer func() {
		_ = tx.Rollback(ctx)
	}()

	var userID string
	err = tx.QueryRow(ctx, `
		INSERT INTO users (username, email, password_hash, full_name, role, status)
		VALUES ($1, $2, $3, $4, 'admin', 'active')
		ON CONFLICT (email)
		DO UPDATE SET
			username = EXCLUDED.username,
			password_hash = EXCLUDED.password_hash,
			full_name = EXCLUDED.full_name,
			role = EXCLUDED.role,
			status = EXCLUDED.status,
			updated_at = NOW()
		RETURNING id
	`, cfg.Demo.Username, cfg.Demo.Email, string(passwordHash), nullableDemoValue(cfg.Demo.FullName)).Scan(&userID)
	if err != nil {
		return fmt.Errorf("upsert demo user: %w", err)
	}

	var collectionID string
	err = tx.QueryRow(ctx, `
		INSERT INTO collections (slug, title, category, description, summary, is_published)
		VALUES ('demo-operations', 'Demo Operations', 'Ops', 'Seeded collection for local Boyeep demos.', 'A ready-to-browse collection created automatically for local development.', true)
		ON CONFLICT (slug)
		DO UPDATE SET
			title = EXCLUDED.title,
			category = EXCLUDED.category,
			description = EXCLUDED.description,
			summary = EXCLUDED.summary,
			is_published = EXCLUDED.is_published,
			updated_at = NOW()
		RETURNING id
	`).Scan(&collectionID)
	if err != nil {
		return fmt.Errorf("upsert demo collection: %w", err)
	}

	var resourceID string
	err = tx.QueryRow(ctx, `
		INSERT INTO resources (owner_id, collection_id, slug, title, description, visibility, status, locale, estimated_minutes, entry_count)
		VALUES ($1, $2, 'demo-resource', 'Demo Resource', 'A seeded resource so the Boyeep template has meaningful content on first boot.', 'public', 'published', 'en', 6, 3)
		ON CONFLICT (slug)
		DO UPDATE SET
			owner_id = EXCLUDED.owner_id,
			collection_id = EXCLUDED.collection_id,
			title = EXCLUDED.title,
			description = EXCLUDED.description,
			visibility = EXCLUDED.visibility,
			status = EXCLUDED.status,
			locale = EXCLUDED.locale,
			estimated_minutes = EXCLUDED.estimated_minutes,
			entry_count = EXCLUDED.entry_count,
			updated_at = NOW()
		RETURNING id
	`, userID, collectionID).Scan(&resourceID)
	if err != nil {
		return fmt.Errorf("upsert demo resource: %w", err)
	}

	entries := []struct {
		position int
		title    string
		content  string
	}{
		{1, "Welcome note", "This demo entry shows how a seeded resource can explain your product or workflow."},
		{2, "Editing flow", "Use the dashboard and create-resource flow to replace demo content with your own modules."},
		{3, "Deployment handoff", "This starter is meant to move from local development to production with minimal structural rework."},
	}

	for _, entry := range entries {
		if _, err := tx.Exec(ctx, `
			INSERT INTO entries (resource_id, position, title, content)
			VALUES ($1, $2, $3, $4)
			ON CONFLICT (resource_id, position)
			DO UPDATE SET
				title = EXCLUDED.title,
				content = EXCLUDED.content,
				updated_at = NOW()
		`, resourceID, entry.position, entry.title, entry.content); err != nil {
			return fmt.Errorf("upsert demo entry %d: %w", entry.position, err)
		}
	}

	if _, err := tx.Exec(ctx, `
		UPDATE resources
		SET entry_count = (SELECT COUNT(*) FROM entries WHERE resource_id = $1),
		    updated_at = NOW()
		WHERE id = $1
	`, resourceID); err != nil {
		return fmt.Errorf("sync demo resource count: %w", err)
	}

	return tx.Commit(ctx)
}

func nullableDemoValue(value string) any {
	if strings.TrimSpace(value) == "" {
		return nil
	}

	return value
}
