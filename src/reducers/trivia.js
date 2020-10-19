import types from 'actions/types';

const DEFAULT_STATE = null;

export default (state = DEFAULT_STATE, action) => {

	switch (action.type) {
	case types.SET_TRIVIA:

		return {
			...state,
			...action.payload,
			};
	default:
			return state;
	}
};
