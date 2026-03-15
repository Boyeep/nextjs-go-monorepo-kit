package service

import (
	"context"
	"time"

	"github.com/example/learning-platform-backend-template/internal/config"
	"github.com/example/learning-platform-backend-template/internal/domain"
)

type pinger interface {
	Ping(context.Context) error
}

type HealthService struct {
	cfg config.Config
	db  pinger
}

func NewHealthService(cfg config.Config, db pinger) HealthService {
	return HealthService{cfg: cfg, db: db}
}

func (s HealthService) Status() domain.HealthStatus {
	database := "unavailable"
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	if s.db != nil && s.db.Ping(ctx) == nil {
		database = "ok"
	}

	return domain.HealthStatus{
		Name:      s.cfg.App.Name,
		Env:       s.cfg.App.Env,
		Version:   s.cfg.App.Version,
		Timestamp: time.Now().UTC(),
		Database:  database,
	}
}
