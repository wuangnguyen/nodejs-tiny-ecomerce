FROM node:alpine

RUN mkdir -p /usr/src/tracking-service && chown -R node:node /usr/src/tracking-service

WORKDIR /usr/src/tracking-service

COPY package.json ./

USER node

RUN npm install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
