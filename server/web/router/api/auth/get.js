const auth = require('@middleware').auth;

const requireAuth = auth.passport.authenticate('jwt', { session: false });

module.exports = {
  requireAuth
};