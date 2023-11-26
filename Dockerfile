# Install dependencies only when needed
FROM node:18-alpine as builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git
WORKDIR /apps

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY .env.development ./
COPY .env.production ./
COPY .env.production ./.env
RUN  yarn --frozen-lockfile;
COPY . .

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build
EXPOSE 3000

CMD ["npx", "serve", "build"]