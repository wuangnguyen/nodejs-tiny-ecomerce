FROM node:17.2

RUN mkdir -p /usr/src/tracking-service && chown -R node:node /usr/src/tracking-service

WORKDIR /usr/src/tracking-service

COPY --chown=node:node package.json package-lock.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3030