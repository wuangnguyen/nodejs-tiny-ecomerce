Run **all services** with docker compose:

- In the `docker-local-setup` folder:
  - Development mode:
    - `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`
  - Prodution mode:
    - `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

Run indiviual service:

- MongoDb & Kafka cluster:

  - In the `docker-local-setup` folder, run this command:
    - `docker-compose -f db-kafka.yml`

- Product Service:

  - In the `product-service` folder, follow these steps:
    - `npm install`
    - `npm run dev` to run the application in development mode
    - `npm run start` to run the application in production mode
    - `npm run test` to run test

- Tracking Service:
  - In the `tracking-service` folder, follow these steps:
    - `npm install`
    - `npm run dev` to run the application in development mode
    - `npm run start` to run the application in production mode
    - `npm run test` to run test
