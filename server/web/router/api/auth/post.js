require('module-alias/register');

const auth = require('@middleware')
const passportService = require('@middleware/auth/passport');
const requireSignin = auth.passport.authenticate('local', { session: false });
const { Authentication } = auth;

module.exports = {
  Authentication,
  requireSignin, 
};
