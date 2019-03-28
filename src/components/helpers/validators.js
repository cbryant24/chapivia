import Ajv from 'ajv'
import authSchema from '../../schemas/auth';
import inputSchema from '../../schemas/input';
import blurSchema from '../../schemas/blur';
import signupSchema from '../../schemas/signup';
import guessSchema from '../../schemas/guess';

const ajv = new Ajv({ allErrors: true });
const signin = ajv.compile(authSchema);
const input = ajv.compile(inputSchema);
const blur = ajv.compile(blurSchema);
const signup = ajv.compile(signupSchema);
const guess = ajv.compile(guessSchema)

export const validate = {
  signin,
  input,
  blur,
  signup,
  guess
}