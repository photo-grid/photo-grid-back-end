const { endpointPrefix } = require("./config/const");
const express = require("express");
const logger = require("./config/logger");
const mongodb = require("./config/mongo");
const cors = require("cors");
const gridRouter = require("./route/gridRoutes");

const app = express();

app.use(cors());
app.use(express.json());

if (mongodb) {
  logger.info("MongoDB connection successfully established");
} else {
  logger.error("MongoDB connection failed, shutting down the server");
  process.exit();
}

app.use(endpointPrefix, gridRouter);

module.exports = app;
