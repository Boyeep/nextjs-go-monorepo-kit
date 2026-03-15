package service

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/example/learning-platform-backend-template/internal/config"
	"github.com/example/learning-platform-backend-template/internal/domain"
)

type AnalyticsService struct {
	cfg    config.Config
	client *http.Client
}

type plausibleAggregateRequest struct {
	SiteID    string   `json:"site_id"`
	Metrics   []string `json:"metrics"`
	DateRange string   `json:"date_range"`
}

type plausibleAggregateResponse struct {
	Results map[string]plausibleMetricValue `json:"results"`
}

type plausibleMetricValue struct {
	Value any `json:"value"`
}

func NewAnalyticsService(cfg config.Config) AnalyticsService {
	return AnalyticsService{
		cfg: cfg,
		client: &http.Client{
			Timeout: 15 * time.Second,
		},
	}
}

func (s AnalyticsService) GetOverview(ctx context.Context) (domain.AnalyticsOverview, error) {
	if s.cfg.Analytics.Provider != "plausible" ||
		s.cfg.Analytics.PlausibleSiteID == "" ||
		s.cfg.Analytics.PlausibleAPIToken == "" {
		return domain.AnalyticsOverview{}, ErrInvalidInput
	}

	requestBody := plausibleAggregateRequest{
		SiteID:    s.cfg.Analytics.PlausibleSiteID,
		Metrics:   []string{"visitors", "pageviews", "views_per_visit", "bounce_rate", "visit_duration"},
		DateRange: "30d",
	}

	body, err := json.Marshal(requestBody)
	if err != nil {
		return domain.AnalyticsOverview{}, err
	}

	baseURL := strings.TrimRight(s.cfg.Analytics.PlausibleBaseURL, "/")
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, baseURL+"/api/v2/query", bytes.NewReader(body))
	if err != nil {
		return domain.AnalyticsOverview{}, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.cfg.Analytics.PlausibleAPIToken)

	resp, err := s.client.Do(req)
	if err != nil {
		return domain.AnalyticsOverview{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return domain.AnalyticsOverview{}, fmt.Errorf("plausible api returned status %d", resp.StatusCode)
	}

	var payload plausibleAggregateResponse
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		return domain.AnalyticsOverview{}, err
	}

	return domain.AnalyticsOverview{
		Visitors:      toInt64(payload.Results["visitors"].Value),
		Pageviews:     toInt64(payload.Results["pageviews"].Value),
		ViewsPerVisit: fmt.Sprintf("%.2f", toFloat64(payload.Results["views_per_visit"].Value)),
		BounceRate:    fmt.Sprintf("%.1f%%", toFloat64(payload.Results["bounce_rate"].Value)),
		VisitDuration: formatSeconds(toFloat64(payload.Results["visit_duration"].Value)),
		DateRange:     "Last 30 days",
		Source:        "Plausible",
	}, nil
}

func toInt64(value any) int64 {
	switch typed := value.(type) {
	case float64:
		return int64(typed)
	case int64:
		return typed
	case int:
		return int64(typed)
	default:
		return 0
	}
}

func toFloat64(value any) float64 {
	switch typed := value.(type) {
	case float64:
		return typed
	case int:
		return float64(typed)
	case int64:
		return float64(typed)
	default:
		return 0
	}
}

func formatSeconds(seconds float64) string {
	duration := time.Duration(seconds * float64(time.Second))
	if duration < time.Minute {
		return fmt.Sprintf("%ds", int(duration.Seconds()))
	}

	minutes := int(duration.Minutes())
	remainingSeconds := int(duration.Seconds()) % 60
	return fmt.Sprintf("%dm %ds", minutes, remainingSeconds)
}

