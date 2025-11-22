# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies with CI optimizations
RUN npm install --prefer-offline --no-audit --progress=false

# Copy config files
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Copy source code
COPY public ./public
COPY src ./src

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production dependencies
COPY package*.json ./

# Install only production dependencies with optimizations
RUN npm install --omit=dev --prefer-offline --no-audit --progress=false

# Copy built app from builder stage
COPY --from=builder /app/build ./build

# Copy server file
COPY server.js ./

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the app
CMD ["node", "server.js"]
