export default {
	title: 'login',
	description: 'User Login',
	inputs: [
		{
			name: 'email',
			blur: 'emptyOrEmail',
			change: 'emptyOrSafeString',
		},
		{
			name: 'password',
			blur: 'emptyOrSafeString',
			change: 'emptyOrSafeString',
		},
	],
	inputErrorMessages: {
		email: 'Email should be in email format',
		password:
			'Password should only contain letters, numbers, and ! @ # $ % characters',
	},
	submit: [
		{
			name: 'email',
			validate: 'safeStringEmail',
		},
		{
			name: 'password',
			validate: 'safeString',
		},
	],
	submitErrorMessages: {
		email: 'There was an error in the email field',
		password: 'There was an error in the password field',
	},
};

//////// SIGNUP VALIDATIONS ////////////
