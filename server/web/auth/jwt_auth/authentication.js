// require('module-alias/register');
const jwt = require('jwt-simple');
const { User } = require('../../../models');
// const config = require('@config/config');
const config = require('../../../config/config');


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
  console.log('this is the auth route am i getting here', email, password, name);
  if(!email || !password || !name ) {
    return res.status(422).send({ error: 'Please provide email, name, and password'});
  }

  // See if a given user exists
  try {
    const currentUser = await User.findOne({ where: {email} });
    console.log('is there a current user lets find out', currentUser);
    if (currentUser) return res.status(422).send({ error: 'Email is in use'});
  } catch (e) {
    console.log('apparently there is the possibility of an error in finding a current user', e)
    return res.status(422).send({e, error: 'There was an error signing up, please try again'});
  }

  
  try {
    user = await User.create({ name, email, password});
    console.log('this is where we create the user error?')
  } catch (e) {
    console.log('is there an error here because if there is god dammit', e)
    return res.status(422).send({e, error: 'There was an error signing up, please try again'});
  }

  res.json({ token: tokenForUser(user)});
}
