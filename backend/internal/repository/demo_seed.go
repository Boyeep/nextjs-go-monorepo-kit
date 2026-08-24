package repository

import (
	"context"
	"fmt"
	"strings"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/config"
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

	return tx.Commit(ctx)
}

func nullableDemoValue(value string) any {
	if strings.TrimSpace(value) == "" {
		return nil
	}

	return value
}
