'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];
const Question = require(__dirname + '/question.js');

let sequelizeQuestion;

if (config.use_env_variable) {
  sequelizeQuestion = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelizeQuestion = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = sequelizeQuestion;