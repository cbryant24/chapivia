import Ajv from 'ajv';
import ajv_errors from 'ajv-errors';
import authSchema from '../../schemas/auth';
import inputSchema from '../../schemas/input';
import signupSchema from '../../schemas/signup';
import guessSchema from '../../schemas/guess';
import patternSchema from '../../schemas/patterns';
import signupFormSchema from '../../schemas/signupForm';

const ajv = new Ajv({ allErrors: true, verbose: true, jsonPointers: true, $data: true, useDefaults: true });
ajv_errors(ajv);
const signupForm = ajv.addSchema(patternSchema, 'patterns.json').compile(signupFormSchema);


export const validate = {
  // signin,
  // input,
  // blur,
  // signup,
  // guess,
  signupForm
}