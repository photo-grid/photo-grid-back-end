require('dotenv').config()

const port = parseInt(process.env.SERVER_PORT);
const endpointPrefix = process.env.BASE_URL_SUFFIX;
const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
const gridSquareImageDimention = parseInt(process.env.SQUARE_GRID_IMAGE_DIMENTION);

module.exports = {
  port,
  endpointPrefix,
  mongoConnectionString,
  gridSquareImageDimention,
};
