const { header, body, check } = require("express-validator");
const validationErrorsHandler = require("../util/validationErrorsHandler");

exports.gridFindValidator = [
  header("user-uuid")
    .notEmpty()
    .withMessage("User-UUID missing in the headers"),
  validationErrorsHandler,
];

exports.gridChangeValidator = [
  header("user-uuid")
    .notEmpty()
    .withMessage("User-UUID missing in the headers"),
  body("items")
    .isArray({ min: 9, max: 9 })
    .withMessage("'items' must be an array with exact 9 objects"),
  check("items.*.imageId")
    .notEmpty()
    .withMessage("'imageId' is required")
    .isNumeric()
    .withMessage("'imageId' must be a number"),
  check("items.*.possition")
    .notEmpty()
    .withMessage("'possition' is required")
    .isInt({ min: -1, max: 8 })
    .withMessage("Must be between -1 and 8"),
  validationErrorsHandler,
];
