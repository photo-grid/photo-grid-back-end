const { port, endpointPrefix, baseURL } = require("./config/const");
const express = require("express");
const logger = require("./config/logger");
const mongodb = require("./config/mongo");
const gridRouter = require("./route/gridRoutes");

const app = express();

app.use(express.json());

if (mongodb) {
  logger.info("MongoDB connection successfully established");
} else {
  logger.error("MongoDB connection failed");
}

app.use(endpointPrefix, gridRouter);

app.listen(port, () => {
  logger.info(`Photo grid app running on ${baseURL}`);
});
