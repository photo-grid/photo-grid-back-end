const { mongoConnectionString } = require("./const");
const mongoose = require("mongoose");
const logger = require("./logger");

// initiating the mongoose connection
mongoose
  .connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((value) => {
    logger.info("Database conection successfull");
  })
  .catch((reason) => {
    logger.error("Database connection failed");
    logger.error(reason);
  });

// creating handler for gracefully disconnecting the server on special situations
const gracefulShutdown = () => {
  logger.info("Closing the mongodb connection");
  mongoose.connection
    .close()
    .then(() => {
      logger.info("Mongodb connection successfully closed");
    })
    .catch((reason) => {
      logger.error(`Mongodb connection closing failed: ${reason}`);
    })
    .finally(() => {
      logger.error("MongoDB connection failed, shutting down the server");
      process.exit();
    });
};

// registering mongodb shutdown handler on considered system signals
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown);

module.exports = mongoose.connection;
