'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];

let sequelize;

if (config.use_env_variable) {
  console.log('hello from userQuestionChoice 0')
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('hello from userQuestionChoice 1')
  sequelize = 'hello'
}

const UserQuestionChoice = sequelize.import(__dirname + '/userQuestionChoice.js');

module.exports = UserQuestionChoice;