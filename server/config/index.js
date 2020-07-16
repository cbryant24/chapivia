'use strict'
const database = require('./components/database');
const auth = require('./components/auth');
const triviaConfig = require('./components/triviaConfig');
// const mailer = require('./components/mailer');


module.exports = {
  database,
  triviaConfig,
  auth,
  // mailer
}