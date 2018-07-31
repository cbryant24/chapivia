'use strict';
// var path      = require('path');
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
// var config    = require(path.resolve(__dirname, '..', '..', 'config', 'database.json'))[env];
const {database: config} = require('@config/');

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var Questions = sequelize.import(__dirname + '/question.js');

module.exports = Questions;