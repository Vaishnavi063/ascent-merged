# =========================
# Backend build stage
# =========================
FROM eclipse-temurin:21-jdk-alpine AS backend-builder

WORKDIR /app/backend

# Copy only dependency files first (cache friendly)
COPY taskify-backend/pom.xml .
COPY taskify-backend/.mvn .mvn
COPY taskify-backend/mvnw .

# Make Maven wrapper executable and download dependencies
RUN chmod +x mvnw && ./mvnw dependency:resolve -B

# Copy source and build
COPY taskify-backend/src ./src
RUN ./mvnw clean package -DskipTests


# =========================
# Frontend build stage
# =========================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy dependency files first (for Docker cache)
COPY taskify-frontend/package.json taskify-frontend/package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy frontend source
COPY taskify-frontend/ .

# Build-time env variable for Vite
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# Build the app
RUN npm run build


# =========================
# Final runtime image
# =========================
FROM eclipse-temurin:21-jre-alpine

# Install nginx and supervisor for process management
RUN apk add --no-cache nginx supervisor

WORKDIR /app

# Copy backend jar
COPY --from=backend-builder /app/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Copy frontend build to nginx
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy supervisor config
COPY supervisord.conf /etc/supervisord.conf

# Create nginx runtime dirs
RUN mkdir -p /run/nginx /var/log/supervisor

# Expose ports (80 for frontend, 5555 for backend API)
EXPOSE 80 5555

# Use supervisor to manage both processes
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
