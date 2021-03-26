const logger = require("../src/config/logger");
const GridModel = require("../models/gridModel");
const gridImageGenerator = require("../util/gridImageGenerator");

exports.find = (req, res) => {
  const _id = req.headers["user-uuid"];
  GridModel.findOne({ _id }, (error, grid) => {
    if (error) {
      logger.error(`Error finding user's grid. User UUID: ${_id}`);
      logger.error(error);
      res.status(400).json({ error });
    } else {
      if (grid) {
        logger.info(`Grid found. User UUID: ${_id}`);
        gridImageGenerator(res, grid.items);
      } else {
        logger.info(`Grid not found. User UUID: ${_id}`);
        res.json({
          gridImage: '',
          items: []
        });
      }
    }
  });
};

exports.change = (req, res) => {
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
        gridImageGenerator(res, grid.items);
      }
    }
  );
};
