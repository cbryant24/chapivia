import { GAME_STATUS, ANNOUNCE_ANSWER } from '../actions/types';

const INITIAL_STATE = {
  gameStatus: false,
  announceAnswer: false
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GAME_STATUS:
      return { ...state, gameStatus: action.payload};
    case ANNOUNCE_ANSWER:
      return { ...state, announceAnswer: action.payload};
    default:
      return state;
  }
}