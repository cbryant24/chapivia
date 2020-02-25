export default {
  title: 'Guess',
  description: 'Player Guess',
  inputs: [
    {
      name: 'player',
      blur: 'emptyOrSafeString',
      change: 'emptyOrSafeString'
    },
    {
      name: 'guess',
      blur: 'emptyOrSafeStringSingleCharABCD',
      change: 'emptyOrSafeStringSingleCharABCD'
    }
  ],
  inputErrorMessages: {
    guess: 'Guess should only be A, B, C, D'
  },
  submit: [
    {
      name: 'guess',
      validate: 'safeString'
    },
    {
      name: 'password',
      validate: 'safeString'
    }
  ],
  submitErrorMessages: {
    guess: 'Guess should only be A, B, C, D'
  }
};
