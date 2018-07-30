const User = require('@user');
const model = require('@models');

const getUsers = () => User.findAll();


module.exports = getUsers;