require('module-alias/register');

const passport = require('passport');
const User = require('@user');
const config = require('@config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
// Create local strategy
const localOptions = { usernameField: 'email'}
const localLogin = new LocalStrategy( localOptions, async (email, password, done) => {
  // Verify this email and password, call done with the user 
  // if it is the correct email and password
  // otherwise, call 'done' with false
  let user = null;
  try {
    user = await User.findOne({ where: {email} });

    if(!user) return done(null, false);

  } catch(e) {
    console.log('this be forced error', e);
    return done(e);
  }
  
  user.comparePassword(password, (err, isMatch) => {
    if (err) { return done(err, {message: 'there was an error'}); }
    if (!isMatch) { return done(null, false, {error: 'incorrect login info'}); }
    console.log('is this the user', user);
    return done(null, user);
  })
})

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // See if the user ID in the payload exists in the database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  console.log('am i hitting this strategy')
  try {
    const user = await User.findById(payload.sub);

    if (user) return done(null, user);

    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);