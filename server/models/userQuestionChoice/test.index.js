'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];
const UserQuestionChoice = require(__dirname + '/userQuestionChoice.js');

let sequelizeUserQuestionChoice;

if (config.use_env_variable) {
  sequelizeUserQuestionChoice = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelizeUserQuestionChoice = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = sequelizeUserQuestionChoice;