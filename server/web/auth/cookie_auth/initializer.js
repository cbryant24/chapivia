const { app } = require("../../initializer");
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

module.exports = {
  initializer: () => app
};
