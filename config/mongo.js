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

module.exports = mongoose.connection
