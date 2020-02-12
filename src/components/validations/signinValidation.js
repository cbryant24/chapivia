export default {
  title: 'signup',
  description: 'User Signin',
  inputs: [
    {
      name: 'email',
      blur: 'emptyOrEmail',
      change: 'emptyOrSafeString'
    },
    {
      name: 'password',
      blur: 'emptyOrSafeString',
      change: 'emptyOrSafeString'
    }
  ],
  inputErrorMessages: {
      email: 'Email should be in email format',
      password: 'Password should only contain letters, numbers, and ! @ # $ % characters'
  },
  submit: [
    {
      name: 'email',
      validate: 'safeString'
    },
    {
      name: 'password',
      validate: 'safeString',
    },
  ],
  submitErrorMessages: {
    email: 'There was an error in the email field',
    password: 'There was an error in the password field'
  }
}

//////// SIGNUP VALIDATIONS ////////////

