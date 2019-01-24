'use strict'
const database = require('./components/database');
const auth = require('./components/auth');
const triviaConfig = require('./components/triviaConfig');


module.exports = {
  database,
  triviaConfig,
  auth
}