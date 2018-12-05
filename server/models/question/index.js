'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];

let sequelize;

if (config.use_env_variable) {
  console.log('hello from question 0')
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('hello from question 1')
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Question = sequelize.import(__dirname + '/question.js');

module.exports = Question;