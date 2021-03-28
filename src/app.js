const { endpointPrefix } = require("./config/const");
const express = require("express");
const mongodb = require("./config/mongo");
const logger = require("./config/logger");
const cors = require("cors");
const gridRouter = require("./route/gridRoutes");
const path = require("path");

// express app creation
const app = express();

// initiating the mongodb connection
if (mongodb) {
  logger.info("MongoDB connection successfully established");
} else {
  logger.error("MongoDB connection failed, shutting down the server");
  process.exit();
}

// setting the static content dir for production
app.use(express.static(path.join(__dirname, "/../front-end/build")));

// enabling CORS for all routes
app.use(cors());

// expecting payloads to be handle based on JSON
app.use(express.json());

// registering the API routes
app.use(endpointPrefix, gridRouter);

// registering the production build of the react app on all allowed paths
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../front-end/build/index.html"));
});

// app gets exported to be used by the server
module.exports = app;
