import Ajv from 'ajv'
import authSchema from '../../schemas/auth.json'
import inputSchema from '../../schemas/input.json'

const ajv = new Ajv({ allErrors: true });
const authValidate = ajv.compile(authSchema);
const inputValidate = ajv.compile(inputSchema);

export const validation = {
  authValidate,
  inputValidate
}