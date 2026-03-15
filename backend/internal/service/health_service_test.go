package service

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/example/learning-platform-backend-template/internal/config"
)

type stubPinger struct {
	err error
}

func (s stubPinger) Ping(context.Context) error {
	return s.err
}

func TestHealthStatusUsesConfiguredNameAndHealthyDatabase(t *testing.T) {
	service := NewHealthService(
		config.Config{
			App: config.AppConfig{
				Name:    "Boyeep Template API",
				Env:     "test",
				Version: "1.0.0",
			},
		},
		stubPinger{},
	)

	status := service.Status()

	if status.Name != "Boyeep Template API" {
		t.Fatalf("expected app name in health status, got %q", status.Name)
	}

	if status.Database != "ok" {
		t.Fatalf("expected database status ok, got %q", status.Database)
	}

	if time.Since(status.Timestamp) > 2*time.Second {
		t.Fatal("expected recent timestamp in health status")
	}
}

func TestHealthStatusMarksDatabaseUnavailable(t *testing.T) {
	service := NewHealthService(
		config.Config{App: config.AppConfig{Name: "Boyeep Template API"}},
		stubPinger{err: errors.New("db down")},
	)

	status := service.Status()

	if status.Database != "unavailable" {
		t.Fatalf("expected unavailable database status, got %q", status.Database)
	}
}
