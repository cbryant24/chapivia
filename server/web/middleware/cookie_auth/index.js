const { signup, login } = require('./passport');

module.exports = {
  cookieSignup: signup,
  cookieLogin: login
}