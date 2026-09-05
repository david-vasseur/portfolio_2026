# Stage 1 : builder
FROM node:25.2.1-bookworm-slim AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl curl nano && rm -rf /var/lib/apt/lists/*

# Installer dépendances
COPY package*.json ./

RUN npm ci

# Copier tout le projet 
COPY . .

# Build NextJS
RUN npm run build

# Stage 2 : runner
FROM node:25.2.1-bookworm-slim AS runner

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm ci --omit=dev

# On récupère uniquement les artéfacts du build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Mode rootless
RUN groupadd -g 1003 nodejs && \
    useradd -u 1003 -g nodejs -s /bin/sh david-vasseur

RUN chown -R david-vasseur:nodejs /app

USER david-vasseur

EXPOSE 4007

# Lancement de l'app
CMD ["npm", "start"]