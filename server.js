const app = require("./src/app");
const logger = require("./src/config/logger");

logger.info("Server ready to start");

// initiating the server on 8888 port
app.listen(8888, () => {
  logger.info(`Server running on http://localhost:8888`);
});
