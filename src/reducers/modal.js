import { GAME_STATUS, ANNOUNCE_ANSWER, OPEN_CLOSE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  open: false
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case OPEN_CLOSE_MODAL:
      return { ...state, open: action.payload};
    default:
      return state;
  }
}