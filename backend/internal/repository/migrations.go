package repository

import (
	"context"
	_ "embed"
	"sort"
	"strings"

	"embed"
	"github.com/jackc/pgx/v5/pgxpool"
)

//go:embed migrations/*.up.sql
var migrationFiles embed.FS

func RunMigrations(ctx context.Context, db *pgxpool.Pool) error {
	entries, err := migrationFiles.ReadDir("migrations")
	if err != nil {
		return err
	}

	fileNames := make([]string, 0, len(entries))
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		name := entry.Name()
		if strings.HasSuffix(name, ".up.sql") {
			fileNames = append(fileNames, name)
		}
	}

	sort.Strings(fileNames)

	for _, fileName := range fileNames {
		sqlBytes, err := migrationFiles.ReadFile("migrations/" + fileName)
		if err != nil {
			return err
		}

		if _, err := db.Exec(ctx, string(sqlBytes)); err != nil {
			return err
		}
	}

	return nil
}
