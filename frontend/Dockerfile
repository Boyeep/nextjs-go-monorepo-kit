FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_APP_NAME="Next.js Go Monorepo Kit"
ARG NEXT_PUBLIC_APP_URL="http://localhost:3000"
ARG NEXT_PUBLIC_API_BASE_URL="http://localhost:8080/api/v1"
ARG NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL="demo@nextjs-go-kit.local"
ARG NEXT_PUBLIC_DEMO_EMAIL="demo@nextjs-go-kit.local"
ARG NEXT_PUBLIC_DEMO_PASSWORD="demo12345"
ARG NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK="false"

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL=${NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL}
ENV NEXT_PUBLIC_DEMO_EMAIL=${NEXT_PUBLIC_DEMO_EMAIL}
ENV NEXT_PUBLIC_DEMO_PASSWORD=${NEXT_PUBLIC_DEMO_PASSWORD}
ENV NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK=${NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
