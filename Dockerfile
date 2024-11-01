FROM node:18-alpine as base

# Install dependencies only when needed
FROM base as deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild application if needed
FROM base as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:1.27-alpine as runner

EXPOSE 80

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/atom-knight/browser /usr/share/nginx/html


