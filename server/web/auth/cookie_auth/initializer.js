const { app } = require('../../initializer');
const passport = require('passport');
// debugger
app.use(passport.initialize());
app.use(passport.session());
// debugger

module.exports = {
  initializer: () => app
}