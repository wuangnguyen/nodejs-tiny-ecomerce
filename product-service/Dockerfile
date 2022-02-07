FROM node:17.2

RUN mkdir -p /usr/src/product-service && chown -R node:node /usr/src/product-service

WORKDIR /usr/src/product-service

COPY --chown=node:node package.json package-lock.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000