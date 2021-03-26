const gridRouter = require("express").Router();
const gridController = require("../controller/gridController");
const { gridFindValidator, gridChangeValidator } = require('../validator/gridValidator');

gridRouter
  .route("/grid")
  .get(...gridFindValidator, gridController.find)
  .put(...gridChangeValidator, gridController.change);

module.exports = gridRouter;
