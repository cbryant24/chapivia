const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  // User already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }

  // See if a given user exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If a user with email does exist return an error    
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }

    // If a user with email does not exist create and save user record
    const user = new User({
      email,
      password
    });

    user.save( (err) => {
      if (err) { return next(err)};

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });    
  })
}