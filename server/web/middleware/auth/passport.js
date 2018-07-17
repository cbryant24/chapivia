const passport = require('passport');
const User = require('@user');
const config = require('@config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { emailField: 'email'}
const localLogin = new LocalStrategy( localOptions, async (email, password, done) => {
  // Verify this email and password, call done with the user 
  // if it is the correct email and password
  // otherwise, call 'done' with false
  try {
    const user = await User.findOne({ email });

    if(!user) return done(null, false);

  } catch(e) {
    return done(e);
  }
  
  try {
    const validPassword = await user.comparePassword(password);
    
    if(!validPassword) return done(null, false);

    return done(null, user);
  } catch(e) {
    return done(err);
  }

  // user.comparePassword(password, (err, isMatch) => {
  //   if (err) { return done(err); }
  //   if(!isMatch) { return done(null, false); }

  //   return done(null, user);
  // });

  // User.findOne({ email }, (err, user) => {
  //   if(err) { return done(err); }

  //   if(!user) { return done(null, false); }

  //   // compare password - is 'password' equal to user.password?
  //   user.comparePassword(password, (err, isMatch) => {
  //     if (err) { return done(err); }
  //     if (!isMatch) { return done(null, false); }

  //     return done(null, user);
  //   })
  // });
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
  try {
    const user = await User.findById(payload.sub);

    if (user) return done(null, user);

    return done(null, false);
  } catch (e) {
    return done(err, false);
  }

  // User.findById(payload.sub, (err, user) => {
  //   if (err) { return done(err, false); }

  //   if (user) {
  //     done(null, user);
  //   } else {
  //     done(null, false);
  //   }
  // });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);