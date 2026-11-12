# The site is static, so the build output is the same files whatever the target
# architecture: build once natively and let only the nginx layer differ per platform.
# The deploy stage runs no commands, so a linux/arm64 image needs no emulation.
FROM --platform=$BUILDPLATFORM node:26.13.0-alpine AS builder

# Reduce npm log spam and colour during install
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# `prebuild` copies the OCR / background-removal assets into public/vendor first
RUN npm run build
# Build metadata served at /info
RUN node -e "const p=require('./package.json');require('fs').writeFileSync('dist/info.json',JSON.stringify({name:p.name,version:p.version,builtAt:new Date().toISOString()}))"

# Create production image
FROM nginx:1.31.8-alpine AS deploy

# So that a registry page says what this is, who maintains it and under what licence.
LABEL org.opencontainers.image.title="Nyxiontech PDF Tools" \
      org.opencontainers.image.description="PDF and image tools that run in the browser. No upload, no account, no backend." \
      org.opencontainers.image.source="https://github.com/jurecki007/nyxiontech-tools" \
      org.opencontainers.image.url="https://tools.nyxiontech.com" \
      org.opencontainers.image.licenses="AGPL-3.0-or-later"

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
