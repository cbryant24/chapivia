import Ajv from 'ajv';
import ajv_errors from 'ajv-errors';
import authSchema from '../../schemas/auth';
import inputSchema from '../../schemas/input';
import signupSchema from '../../schemas/signup';
import guessSchema from '../../schemas/guess';
import patternSchema from '../../schemas/patterns';
import blurSchema from '../../schemas/blur';

const pattSchema = patternSchema
// jsonPointers: true,
const ajv = new Ajv({ allErrors: true, verbose: true, jsonPointers: true, $data: true, useDefaults: true });
ajv_errors(ajv);
const form = ajv.addSchema(patternSchema, 'patterns.json').compile(blurSchema);
// const signin = ajv.compile(authSchema);
// const input = ajv.compile(inputSchema);
// const blur = ajv.compile(blurSchema);
// const signup = ajv.compile(signupSchema);
// const guess = ajv.compile(guessSchema);

export const validate = {
  // signin,
  // input,
  // blur,
  // signup,
  // guess,
  form
}