const auth = require('@middleware').auth;
const requireSignin = auth.passport.authenticate('local', { session: false});
const { Authentication } = auth;
const { signup } = auth.Authentication;

module.exports = {
  Authentication,
  requireSignin, 
  signup
};