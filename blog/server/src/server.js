const express = require('express');
const {host, port} = require('../config/serverConfig');
const router = require('./routes/index');
var cors = require('cors');
const logger = require('./logger')
const context = require('request-context')
const { v4: generateUUID } = require('uuid')

const app = express();
app.use(cors());

app.use(express.json());
app.use(context.middleware('request'));
app.use((req, res, next) => {
  context.set('uuid', generateUUID());
  res.type('text/plain')
  next()
})

app.use('/api', router);

app.use((err, req, res, next) => {
  logger.fatal(err)
  res.status(500).send(err.toString())
  next()
});

app.listen(port, host, () => console.log('App started', host, port));
