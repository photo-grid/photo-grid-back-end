const { baseURL } = require("./src/config/const");
const app = require("./src/app");
const logger = require("./src/config/logger");

app.listen(8888, () => {
  logger.info(`Photo grid app running on http://localhost:8888`);
});
