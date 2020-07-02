import { combineReducers } from 'redux';

import trivia from 'reducers/trivia';

export default combineReducers({
	trivia,
	// apollo: client.reducer(),
});
