require('module-alias/register');

const passport = require('passport');
const { User } = require('../../../models');
const LocalStrategy = require('passport-local').Strategy;
const validate = require('../../../config/schemas');

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);

  return done(null, user);
});

// Create local strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // Verify this email and password, call done with the user
      // if it is the correct email and password
      // otherwise, call 'done' with false
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, 'Invalid Email and Or Password');
        }

        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, 'Invalid Email and Or Password');
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

async function signup({ name, email, password, req }) {
  if (!email || !password || !name) {
    throw new Error('You must provide an email, password, and name.');
  }

  const valid = validate.signup({ name, email, password });

  if (!valid) {
    throw new Error('Invalid character used in field');
  }

  return User.findOne({ where: { email } })
    .then(existingUser => {
      if (existingUser) {
        throw new Error(`Email ${email} is already in use`);
      }

      return User.create({ name, email, password });
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, err => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({ email, password, req }) {
  const valid = validate.signin({ email, password });

  if (!valid) {
    throw new Error('Invalid character used in field');
  }

  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('Invalid Email and Or Password');
      }
      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };
