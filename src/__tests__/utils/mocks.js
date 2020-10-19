import { GraphQLError } from 'graphql';

import graphqlUser from 'queries/CurrentUser';
import graphqlLogin from 'mutations/Login';
import graphqlRegister from 'mutations/Register';
import graphqlLogout from 'mutations/Logout';
import graphqlScores from 'queries/Scores';
import graphqlUnguessedPlayers from 'queries/UnguessedPlayers';
import graphqlGuessListQuery from 'queries/GuessList';
import graphqlGuess from 'mutations/Guess';
import { DAILY_TRIVIA } from 'localState/Queries';
import { user } from '__tests__/utils/data';

let refetched = false;

export const LOGGED_IN_USER = {
	request: {
		query: graphqlUser,
	},
	result: () => {
		return {
			data: {
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role.nonAdmin,
				},
			},
		};
	},
};

export const LOGGED_IN_ADMIN = {
	request: {
		query: graphqlUser,
	},
	result: () => {
		return {
			data: {
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role.admin,
				},
			},
		};
	},
};

export const LOGIN_MUTATION = {
	request: {
		query: graphqlLogin,
		variables: {
			email: user.email,
			password: user.password,
		},
	},
	result: () => {
		return {
			data: { login: { id: user.id, name: user.name, email: user.email } },
		};
	},
};

export const REGISTER_MUTATION = {
	request: {
		query: graphqlRegister,
		variables: {
			email: user.email,
			password: user.password,
			name: user.name,
		},
	},
	result: () => {
		return {
			data: { register: { id: user.id, name: user.name, email: user.email } },
		};
	},
};

export const LOGOUT_MUTATION = {
	request: {
		query: graphqlLogout,
	},
	result: () => {
		return { data: { logout: null } };
	},
};

export const INCORRECT_GUESS_MUTATION = {
	request: {
		query: graphqlGuess,
		variables: {
			userId: 0,
			questionId: 0,
			questionChoiceId: 0,
			guess: 'Washington',
		},
	},
	result: () => {
		return { data: { guess: { isCorrect: false } } };
	},
};

export const CORRECT_GUESS_MUTATION = {
	request: {
		query: graphqlGuess,
		variables: {
			userId: 0,
			questionId: 0,
			questionChoiceId: 0,
			guess: 'San Francisco',
		},
	},
	result: () => {
		return { data: { guess: { isCorrect: true } } };
	},
};

export const LOGGED_OUT_USER = {
	request: {
		query: graphqlUser,
	},
	result: () => {
		return { data: { user: null } };
	},
};

export const LOGIN_ERROR = {
	request: {
		query: graphqlLogin,
		variables: {
			email: user.email,
			password: user.password,
		},
	},
	result: () => {
		return { errors: [new GraphQLError('There was an error logging in')] };
	},
};

export const REGISTER_ERROR = {
	request: {
		query: graphqlRegister,
		variables: {
			email: user.email,
			password: user.password,
			name: user.name,
		},
	},
	result: () => {
		return { errors: [new GraphQLError('There was an error registering')] };
	},
};

export const SCORES_MOCK = {
	request: {
		query: graphqlScores,
	},
	result: () => {
		return {
			data: {
				scores: [
					{ id: 0, name: 'Kanye', score: 5 },
					{ id: 1, name: 'Kid Cudi', score: 1 },
					{ id: 2, name: 'a$ap rocky', score: 2 },
				],
			},
		};
	},
};

export const UNGUESSED_PLAYER = {
	request: { query: graphqlUnguessedPlayers },
	result: () => {
		return {
			data: { nonGuessedPlayers: [{ id: 0, name: 'Kanye', role: 'player' }] },
		};
	},
};

export const UNGUESSED_PLAYERS = {
	request: { query: graphqlUnguessedPlayers },
	result: () => {
		return {
			data: {
				nonGuessedPlayers: [
					{ id: 0, name: 'Kanye', role: 'player' },
					{ id: 1, name: 'Kid Cudi', role: 'player' },
					{ id: 2, name: 'a$ap rocky', role: 'player' },
				],
			},
		};
	},
};

export const EMPTY_UNGUESSED_PLAYERS = {
	request: { query: graphqlUnguessedPlayers },
	result: () => {
		return {
			data: { nonGuessedPlayers: [] },
		};
	},
};

export const GUESS_LIST = {
	request: { query: graphqlGuessListQuery },
	result: () => {
		return {
			data: {
				guessedPlayers: [
					{ id: 0, name: 'Kanye', userQuestionChoices: [{ isCorrect: false }] },
					{
						id: 1,
						name: 'Kid Cudi',
						userQuestionChoices: [{ isCorrect: false }],
					},
					{
						id: 2,
						name: 'a$ap rocky',
						userQuestionChoices: [{ isCorrect: true }],
					},
				],
			},
		};
	},
};
