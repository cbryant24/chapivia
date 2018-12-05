'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config').database[env];

let sequelize;

if (config.use_env_variable) {
  console.log('hello from user 0')
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('hello from user 1')
  sequelize = 'hello'
}

const User = sequelize.import(__dirname + '/user.js');

module.exports = User;