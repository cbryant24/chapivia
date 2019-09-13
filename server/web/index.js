// const app = require('./server');
/////////////////////// MOVE ALL THIS TO SERVER OR SOMETHING NOT INDEX.JS
const winston = require('winston');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
// const server = require('./graphql');

const { app } = require('./initializer');
const auth = require('./auth')
const graphql = require('./graphql');

// const port = process.env.PORT || 4001;
const port = 4000;

// const app = require('../web/graphql');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  silent: false,
  level: 'verbose'
});

app.use(cors());

app.use( express.static( `${__dirname}/../../build` ) );

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../build/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;