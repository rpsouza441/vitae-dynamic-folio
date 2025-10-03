# --- Build stage ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies
RUN npm ci --no-audit --no-fund

# Copy source files
COPY . .

# Build with BASE_PATH support
ARG BASE_PATH=/
ENV BASE_PATH=$BASE_PATH

RUN npm run build

# --- Runtime stage ---
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy built assets
COPY --from=build /app/dist ./

# Copy nginx configuration
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

# Create robots.txt blocking indexation
RUN printf "User-agent: *\nDisallow: /\n" > /usr/share/nginx/html/robots.txt

# Expose port
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
