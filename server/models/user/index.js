'use strict';
var path      = require('path');
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(path.resolve(__dirname, '..', '..', 'config', 'database.json'))[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var user = sequelize.import(__dirname + '/user.js');

module.exports = user;