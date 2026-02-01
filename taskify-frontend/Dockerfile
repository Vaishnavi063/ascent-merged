# ---- Build stage ----
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy dependency files first (for Docker cache)
    COPY package.json package-lock.json ./
    
    # Install dependencies
    RUN npm ci --legacy-peer-deps
    
    # Copy the rest of the app
    COPY . .
    
    # Build-time env variable for Vite
    ARG VITE_BASE_URL
    ENV VITE_BASE_URL=$VITE_BASE_URL
    
    # Build the app
    RUN npm run build
    
    
    # ---- Runtime stage ----
    FROM nginx:alpine
    
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    