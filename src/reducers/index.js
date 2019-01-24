import { combineReducers } from 'redux';

import auth from './auth';
import players from './players';
import trivia from './trivia';
import game from './game';

export default combineReducers({
  auth,
  players,
  trivia,
  game,
});