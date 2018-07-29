// require('module-alias/register');
const jwt = require('jwt-simple');
const User = require('@user');
const config = require('@config/config');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (user, res) => {
  // User already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(user) });
}

exports.signup = async (req, res, next) => {
  const { email, password, name, } = req.body;
  let user = null;

  if(!email || !password ) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a given user exists
  try {
    const currentUser = await User.find({ where: {email} });
    if (currentUser) return res.status(422).send({ error: 'Email is in use'});
  } catch (e) {
    return res.status(422).send({e, error: 'There was an error signing up, please try again'});
  }

  
  try {
    user = await User.create({ name, email, password});
  } catch (e) {
    return res.status(422).send({e, error: 'There was an error signing up, please try again'});
  }

  res.json({ token: tokenForUser(user)});
}
