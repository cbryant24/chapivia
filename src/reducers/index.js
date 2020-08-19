import { combineReducers } from 'redux';

import trivia from 'reducers/trivia';
import modal from 'reducers/modal';

export default combineReducers({
	trivia,
	modal,
});
