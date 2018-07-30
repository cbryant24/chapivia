const auth = require('@middleware');

const requireAuth = auth.passport.authenticate('jwt', { session: false });

module.exports = {
  requireAuth
};