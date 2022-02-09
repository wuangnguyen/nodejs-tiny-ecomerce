# How it works

This application is built based on [Feathers](https://feathersjs.com/). Feathers is a service oriented REST and Real Time API layer. Endpoints are defined as services.

## Application Structure

- `app.js` - Entry point for the application.
- `config/` - Configuration/environment variables for the server.
- `src/services/` - Service implementations
- `src/middleware/` - Middleware implementations
- `src/models/` - Schema definitions for our Mongoose models(Easily changed to use other databases).
- `src/hooks/` - Hooks for running code before and after services. Used for formatting requests and responses correctly.

# Getting started

To get the Feathers server running locally:

Prerequisites:

- MongoDb. You can setup a MongoDb locally or use a cloud instance. In this example, I will setup a local MongoDb via docker compose.
- Kafka cluster. In this example, I will setup a local Kafka cluster via docker compose.

**Note**: To get MongoDb and a Kafka cluster up and running locally, please make sure docker and docker compose are installed already in your machine.

In the `docker-local-setup` folder, run this command: `docker-compose -f db-rabbitmq.yml up`

- `npm install` to install all required dependencies
- Update environment variables accordingly in the config/ folder.
- `npm start` to start the local server (or `npm test` to run tests).
