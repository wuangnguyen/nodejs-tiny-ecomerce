class Server {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
    this.server = null;
    process.on('uncaughtException', this.unexpectedErrorHandler);
    process.on('unhandledRejection', this.unexpectedErrorHandler);

    process.on('SIGTERM', () => {
      this.logger.info('SIGTERM received');
      if (this.server) {
        this.server.close();
      }
    });
  }
  exitHandler = () => {
    if (this.server) {
      this.server.close(() => {
        this.logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  unexpectedErrorHandler = (error) => {
    this.logger.error(error);
    this.exitHandler();
  };
  async start(app) {
    this.server = await app.listen(this.config, () => {
      this.logger.info(`Server started and listening to port ${this.config.port}`);
    });
    return this.server;
  }
}

module.exports = Server;
