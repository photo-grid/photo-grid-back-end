const winston = require("winston");

// using winston to create custom logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss:SSS",
    }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : " ")
    )
  ),
  transports: [
    new winston.transports.File({
      filename: "logs.log",
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
