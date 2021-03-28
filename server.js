const { port, baseURL } = require("./src/config/const");
const app = require("./src/app");
const logger = require("./src/config/logger");

app.listen(port, () => {
  logger.info(`Photo grid app running on ${baseURL}`);
});
