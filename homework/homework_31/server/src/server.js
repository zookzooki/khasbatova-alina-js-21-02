const express = require('express');
const {host, port} = require('../config/serverConfig');
const router = require('./routes/index');
var cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json())
app.use((req, res, next) => {
  res.type('text/plain')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET, POST')
    .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/api', router);

app.listen(port, host, () => console.log('App started'));
