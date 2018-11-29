import axios from 'axios';
import { shuffle } from 'lodash';
import {
  AUTH_USER, 
  AUTH_ERROR, 
  DISPLAY_TRIVIA, 
  GET_PLAYER_GUESSES, 
  GET_PLAYERS,
  GAME_STATUS,
  ANNOUNCE_ANSWER,
  OPEN_CLOSE_MODAL,
  GET_CORRECT_GUESSERS,
  GET_PLAYER_SCORES,
 } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem('token', response.data.token);
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
  }
};

export const signin = ({email, password}, callback) => async dispatch => {
  try {
    // const response = await axios.post('http://localhost:3090/signin', formProps);
    const data = await axios.post('/api/signin', {email, password});
    dispatch({
      type: AUTH_USER,
      payload: data.data.token
    });

    localStorage.setItem('token', data.data.token);
    callback();
  } catch(e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login provided' })
  }
};

export const signout = () => async dispatch => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const getPlayers = () => async dispatch => {
  const data = await axios.get('/api/users');
  dispatch({
    type: GET_PLAYERS,
    payload: data.data
  })
};

export const getTrivia = () => async dispatch => {
  try {
    const res = await axios.get('/api/daily_trivia');
    const triviaChoices = shuffle(res.data.questionChoices);
    const triviaQuestion = res.data.question;
    const triviaIds = {
      questionId: res.data.questionId,
      choiceId: res.data.questionChoiceId
    };
    const triviaAnswer = res.data.correctChoice;
    dispatch({
      type: DISPLAY_TRIVIA,
      payload: {triviaChoices, triviaQuestion, triviaIds, triviaAnswer}
    });
  } catch(e) {
    //TODO display error when trivia api fails
  }
  
};

export const updatePlayerChoice = (playerGuessData) => async dispatch => {
  const updated = await axios.post('/api/player_guess', {playerGuessData});
};

export const recordPlayerGuess = (playerGuessData, cb = null) => async dispatch =>{
  const response = await axios.post('/api/player_guess', {playerGuessData});
  if(cb) cb();
};

export const getPlayerScores = () => async dispatch => {
  const {data: playerScores} = await axios.get('/api/player_scores');
  dispatch({
    type: GET_PLAYER_SCORES,
    payload: playerScores
  });
};

export const getPlayerGuesses = () => async dispatch => {
  try {
    const response = await axios.get('/api/current_guesses');
    dispatch({
      type: GET_PLAYER_GUESSES,
      payload: response.data
    });
  } catch(e) {
    debugger
    //TODO add error handling for getting players who have guessed todays trivia
  }
};

export const updateGameStatus = status => dispatch => {
  dispatch({
    type: GAME_STATUS,
    payload: status
  });
};

export const displayTriviaAnswer = status => dispatch => {
  dispatch({
    type: ANNOUNCE_ANSWER,
    payload: status
  });
};

export const openCloseModal = status => dispatch => {
  dispatch({
    type: OPEN_CLOSE_MODAL,
    payload: status
  });
};

export const getCorrectGuessers = () => async dispatch => {
  const res = await axios.get('/api/correct_guesses');
  dispatch({
    type: GET_CORRECT_GUESSERS,
    payload: res.data
  });
}