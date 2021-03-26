const port = 8888;
const endpointPrefix = '/api'
const baseURL = `http://localhost:${port}`;
const mongoConnectionString =
  "mongodb+srv://gapstars:XkZmkuOulx52yEtg@cluster0.0njio.mongodb.net/photo-grid?retryWrites=true&w=majority";
const gridSquareImageDimention = 450;

module.exports = {
  port,
  endpointPrefix,
  baseURL,
  mongoConnectionString,
  gridSquareImageDimention,
};
