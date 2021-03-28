const { endpointPrefix } = require("./config/const");
const express = require("express");
const logger = require("./config/logger");
const mongodb = require("./config/mongo");
const cors = require("cors");
const gridRouter = require("./route/gridRoutes");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "/../front-end/build")));

app.use(cors());
app.use(express.json());

if (mongodb) {
  logger.info("MongoDB connection successfully established");
} else {
  logger.error("MongoDB connection failed, shutting down the server");
  process.exit();
}

app.use(endpointPrefix, gridRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../front-end/build/index.html"));
  //
});

module.exports = app;
