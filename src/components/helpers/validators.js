import Ajv from 'ajv';
import ajv_errors from 'ajv-errors';
import patternSchema from '../../components/Form/patterns';
import signupFormSchema from '../../schemas/signupForm';
import signinFormSchema from '../../schemas/signinForm';
import guessFormSchema from '../../schemas/guessForm';

const ajv = new Ajv({ allErrors: true, verbose: true, jsonPointers: true, $data: true, useDefaults: true });
ajv.addSchema(patternSchema, 'patterns.json');
const signupForm  = ajv.compile(signupFormSchema),
      signinForm  = ajv.compile(signinFormSchema),
      guessForm   = ajv.compile(guessFormSchema);


export const validate = {
  signupForm,
  signinForm,
  guessForm
}