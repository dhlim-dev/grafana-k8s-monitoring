# syntax=docker/dockerfile:1.17

ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

RUN corepack enable

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.pnpm \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 8080

CMD ["node", "start"]
