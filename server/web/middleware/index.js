const auth = require('./auth');
const cookieAuth = require('./cookie_auth');

module.exports = {
  ...auth,
  ...cookieAuth
};