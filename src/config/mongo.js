const { mongoConnectionString } = require('./const')
const mongoose = require('mongoose')
const logger = require('./logger')

mongoose.set('useFindAndModify', false);

mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(value => {
  logger.info('Database conection successfull')
})
.catch(reason => {
  logger.error('Database connection failed')
  logger.error(reason)
})

const gracefulShutdown = () => {
  logger.info("Closing the mongodb connection");
  mongoose.connection
    .close()
    .then(() => {
      logger.info("Mongodb connection successfully closed");
    })
    .catch((reason) => {
      logger.error(`Mongodb connection closing failed: ${reason}`);
    })
    .finally(() => {
      logger.info('Server shutting down');
      process.exit()
    })
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);

module.exports = mongoose.connection
