const { signup, login } = require('./passport');
const { initializer } = require('./initializer');
const app = initializer();

module.exports = {
  cookieSignup: signup,
  cookieLogin: login,
  app
}