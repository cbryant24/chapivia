'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];
const QuestionChoice = require(__dirname + '/questionchoice.js');

let sequelizeQuestionChoice;

if (config.use_env_variable) {
  sequelizeQuestionChoice = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelizeQuestionChoice = new Sequelize(config.database, config.username, config.password, config);
}


module.exports = sequelizeQuestionChoice;