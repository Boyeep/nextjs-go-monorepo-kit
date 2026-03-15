APP_NAME=nextjs-go-monorepo-kit-api

.PHONY: run build fmt tidy

run:
	go run ./cmd/api

build:
	go build ./...

fmt:
	gofmt -w ./cmd ./internal

tidy:
	go mod tidy
