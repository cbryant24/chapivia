import types from 'actions/types';

const DEFAULT_STATE = {
	questionId: null,
	question: '',
	questionChoices: [],
	questionChoicesId: null,
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
	case types.SET_TRIVIA:
		return {
			...state,
				trivia: action.payload,
			};
	default:
			return state;
	}
};
