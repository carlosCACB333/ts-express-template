FROM node:22-alpine AS node-image


# development stage

FROM node-image AS base
RUN yarn global add bun

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install
RUN bunx prisma generate

FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["sh", "-c", "bunx prisma migrate deploy && bun dev"]



# production stage

FROM base AS deps-prod
ENV NODE_ENV=production
WORKDIR /app
COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install --no-save --production
RUN bunx prisma generate

FROM base AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM node-image AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=deps-prod /app/node_modules ./node_modules
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn start"]
