// const app = require('./server');
const winston = require('winston');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = require('../web/graphql');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  silent: false,
  level: 'verbose'
});

app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));

app.use( express.static( `${__dirname}/../../build` ) );

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../build/index.html'));
});

const port = 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;