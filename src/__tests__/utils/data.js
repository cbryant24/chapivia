export const user = {
	id: 0,
	name: 'Kanye',
	email: 'kanye@west.com',
	score: 5,
	role: {
		nonAdmin: 'player',
		admin: 'admin',
	},
	password: 'abc12345',
	confirmPassword: 'abc12345',
};

export const trivia = {
	questionId: 0,
	question:
		'Which city did Anger berate for ruining pizza in &quot;Inside Out&quot;?',
	questionChoicesId: 0,
	questionChoices: ['Minnesota', 'Washington', 'California', 'San Francisco'],
	category: 'Entertainment: Cartoon & Animations',
};

export const triviaState = {
	trivia: {
		dailyTrivia: {
			id: 0,
			questionId: 0,
			question:
				'Which city did Anger berate for ruining pizza in &quot;Inside Out&quot;?',
			category: 'Entertainment: Cartoon & Animations',
			triviaChoices: {
				id: 0,
				choices: ['Minnesota', 'Washington', 'California', 'San Francisco'],
			},
		},
	},
};

export const modalState = {
	modal: {
		isOpen: false,
		message: '',
		afterClose: null,
		beforeClose: null,
		afterOpen: null,
		beforeOpen: null,
	},
};
