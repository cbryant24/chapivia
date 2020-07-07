'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];
const User = require(__dirname + '/user.js');

let sequelizeUser;

if (config.use_env_variable) {
  sequelizeUser = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelizeUser = new Sequelize(config.database, config.username, config.password, config);
}


module.exports = sequelizeUser;