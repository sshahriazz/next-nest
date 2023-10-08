# setup nextjs
FROM node:18.18 as nextjs
WORKDIR /apps
COPY ./apps/client/package.json ./
RUN npm install
COPY ./apps/client ./
RUN npm run build
