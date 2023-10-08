# setup nestjs
FROM node:18.18 as nestjs
WORKDIR /apps
COPY ./apps/server/package.json ./
RUN npm install
COPY ./apps/server ./
RUN npm run build
