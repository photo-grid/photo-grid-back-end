const { port, endpointPrefix, baseURL } = require("./src/config/const");
const express = require("express");
const logger = require("./src/config/logger");
const mongodb = require("./src/config/mongo");
const gridRouter = require("./src/route/gridRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
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
