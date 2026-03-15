FROM golang:1.25.1-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /boyeep-template-api ./cmd/api

FROM alpine:3.21

RUN adduser -D -u 10001 appuser
WORKDIR /app

COPY --from=builder /boyeep-template-api /usr/local/bin/boyeep-template-api

EXPOSE 8080

USER appuser

CMD ["boyeep-template-api"]
