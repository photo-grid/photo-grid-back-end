const config = require('./config')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(config.port, () => {
  console.log(`Photo grid app running on ${config.baseURL}`)
})
