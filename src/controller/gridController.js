const logger = require("../config/logger");
const GridModel = require("../models/gridModel");
const gridImageGenerator = require("../util/gridImageGenerator");

// registering the find controller
exports.find = (req, res) => {
  // session based user id expectedto be on the header
  const _id = req.headers["user-uuid"];
  // check and fetches user's selected iamgec ombination
  GridModel.findOne({ _id }, (error, grid) => {
    if (error) {
      logger.error(`Error finding user's grid. User UUID: ${_id}`);
      logger.error(error);
      res.status(400).json({ error });
    } else {
      if (grid) {
        logger.info(`Grid found. User UUID: ${_id}`);
        // calling the image builder
        gridImageGenerator(res, grid.items);
      } else {
        logger.info(`Grid not found. User UUID: ${_id}`);
        res.json({
          gridImage: "",
          items: [],
        });
      }
    }
  });
};

// registering he change controller
exports.change = (req, res) => {
  // session based user id expectedto be on the header
  const _id = req.headers["user-uuid"];
  GridModel.findOneAndUpdate(
    { _id },
    { items: req.body.items },
    { new: true, upsert: true },
    (error, grid) => {
      if (error) {
        logger.error(`Error changing user's grid. User UUID: ${_id}`);
        logger.error(error);
        res.status(400).json({ error });
      } else {
        logger.info(`Grid successfully changed. User UUID: ${_id}`);
        // calling the image builder
        gridImageGenerator(res, grid.items);
      }
    }
  );
};
