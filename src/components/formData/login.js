export default {
	form: {
		data: { name: 'loginForm', submit: 'signup' },
		style: {
			themeStyle: [
				'authForm',
				'flexSpaceBetweenColumn',
				'marginBottomMedium',
				'paddingMedium',
			],
			id: 'login-form',
		},
	},
	inputs: [
		{
			data: {
				type: 'email',
				name: 'email',
				label: 'email',
				placeholder: 'enter email',
				required: true,
			},
			fieldStyle: { themeStyle: 'fieldMain' },
			inputStyle: { themeStyle: 'inputMain' },
		},
		{
			data: {
				type: 'password',
				name: 'password',
				label: 'password',
				placeholder: 'enter password',
				required: true,
			},
			fieldStyle: { themeStyle: 'fieldMain' },
			inputStyle: { themeStyle: 'inputMain' },
		},
	],
	buttons: [
		{
			text: 'Submit',
			type: 'submit',
			cb: null,
			style: { themeStyle: 'squareButton', mr: [3] },
			disabledStyle: { themeStyle: 'disabledSquareButton', mr: [3] },
		},
		{
			text: 'Cancel',
			type: 'cancel',
			cb: null,
			style: { themeStyle: 'squareButton' },
		},
	],
};
