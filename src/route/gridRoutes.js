const gridRouter = require("express").Router();
const gridController = require("../controller/gridController");
const {
  gridFindValidator,
  gridChangeValidator,
} = require("../validator/gridValidator");

// generating the routed under /grid endpoint,
// using request validators and req and res handlers as middlewares
gridRouter
  .route("/grid")
  .get(...gridFindValidator, gridController.find)
  .put(...gridChangeValidator, gridController.change);

module.exports = gridRouter;
