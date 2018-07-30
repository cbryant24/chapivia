'use strict'
const router = require('./router');
const express = require('express');
const app = express();

app.use(router);

module.exports = app;