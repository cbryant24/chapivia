'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];

let sequelize;

if (config.use_env_variable) {
  console.log('hello from questionChoice 0')
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('hello from questionChoice 1')
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const QuestionChoice = sequelize.import(__dirname + '/questionchoice.js');

module.exports = QuestionChoice;