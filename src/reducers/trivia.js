import { DISPLAY_TRIVIA } from '../actions/types';

const INITIAL_STATE = {
  triviaData: {
    triviaQuestion: null,
    triviaChoices: null,
    correctAnswer: ''
  },
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case DISPLAY_TRIVIA:
      return { ...state, triviaData: action.payload};
    default:
      return state;
  }
}