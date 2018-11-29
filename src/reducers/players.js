import { 
  GET_PLAYERS, 
  GET_PLAYER_GUESSES, 
  GET_CORRECT_GUESSERS, 
  GET_PLAYER_SCORES 
} from '../actions/types';

const INITIAL_STATE = {
  players: [],
  playersGuessed: [],
  correctGuessers: [],
  playerScores: []
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_PLAYERS:
      return { ...state, players: action.payload};
    case GET_PLAYER_GUESSES:
      return {...state, playersGuessed: action.payload};
    case GET_CORRECT_GUESSERS:
      return {...state, correctGuessers: action.payload};
    case GET_PLAYER_SCORES:
      return {...state, playerScores: action.payload};
    default:
      return state;
  }
}