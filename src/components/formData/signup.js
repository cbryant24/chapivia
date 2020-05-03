export default {
  form: {
    data: { name: 'signupForm', submit: 'signup', },
    style: {
      themeStyle: [
        'authForm',
        'flexSpaceBetweenColumn',
        'marginBottomMedium',
        'paddingMedium'
      ],
      remove: 'height',
      height: '50em',
      id:'signup-form',
    }
  },
  inputs: [
    {
      data: {
        type: 'input',
        name: 'name',
        label: 'name',
        placeholder: 'enter name',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'email',
        name: 'email',
        label: 'email',
        placeholder: 'enter email',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'password',
        name: 'password',
        label: 'password',
        placeholder: 'enter password',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    },
    {
      data: {
        type: 'password',
        name: 'confirm password',
        label: 'confirm password',
        placeholder: 'reenter password',
        required: true
      },
      fieldStyle: { themeStyle: 'fieldMain' },
      inputStyle: { themeStyle: 'inputMain' }
    }
  ],
  buttons: [
    {
      text: 'Submit',
      type: 'submit',
      cb: null,
      style: { themeStyle: 'squareButton', mr: [3] },
      disabledStyle: { themeStyle: 'disabledSquareButton', mr: [3] }
    },
    {
      text: 'Cancel',
      type: 'cancel',
      cb: null,
      style: { themeStyle: 'squareButton' }
    }
  ]
};
