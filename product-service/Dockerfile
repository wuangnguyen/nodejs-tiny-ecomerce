FROM node:alpine

RUN mkdir -p /usr/src/product-service && chown -R node:node /usr/src/product-service

WORKDIR /usr/src/product-service

COPY package*.json ./

USER node

RUN npm install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000

CMD ["node", "index.js"]