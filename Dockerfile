# Stage 1 — build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files first (caches install)
COPY package*.json ./
# If you use yarn, copy yarn.lock instead and replace npm ci with yarn install --frozen-lockfile
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:stable-alpine
# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*
# Copy built app
COPY --from=build /app/build /usr/share/nginx/html

# Optional: copy our nginx config (see next step for default.conf)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
