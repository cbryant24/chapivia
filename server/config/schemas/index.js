const Ajv = require('ajv');
const signinSchema = require('./signin');
const signupSchema = require('./signup');
const guessSchema = require('./guess');

const ajv = new Ajv({ allErrors: true });
const signin = ajv.compile(signinSchema);
const signup = ajv.compile(signupSchema);
const guess = ajv.compile(guessSchema);

module.exports = {
  signin,
  signup,
  guess
}