const dateFormat = require('dateformat');

const { User, UserQuestionChoice } = require('../../../../models');

const { formatModel } = require('../helpers');

const user = new User();
const userQuestionChoice = new UserQuestionChoice();

const allUsers = () => user.getPlayers();

const userScores = async function() {
  const scores = {};
  let currentHour = new Date().getHours();
  console.log()
  if( currentHour >= 15) {
    try { 
      players = await allUsers();
  
      for (let player in players) {
        scores[player] = await UserQuestionChoice.count({
          where: {
            userId: players[player].id, 
            isCorrect: true,
          }
        });
      }
    } catch(e) {
      //TODO add error handling for player scores retrieval
      console.log(e);
    }

    return scores;
  }
  
  try { 
    const gameDate = dateFormat('yyyy-mm-dd');
    players = await allUsers();

    for (let player in players) {
      scores[player] = await UserQuestionChoice.count({
        where: {
          userId: players[player].id, 
          isCorrect: true,
          updatedAt: {
            $lt: gameDate
          }
        }
      });
    }

    return scores
  } catch(e) {
    //TODO add error handling for player scores retrieval
    console.log(e);
  }
  
}

const currentUserGuesses = async function() {
  //TODO remove password from being sent to front for user
  const gameDate = dateFormat('yyyy-mm-dd');
  let todaysGuesses = [];
  let guessedPlayers = [];
  
  try {
    todaysGuesses = await UserQuestionChoice.findAll({
      where: {
        updatedAt: {
          $gte: gameDate
        }
      }
    });
  } catch(e) {
    debugger
    // TODO add error handling for when getting todays guesses
  }

  try {
    guessedPlayers = todaysGuesses.map( async guess => {
        let {name, id} = await User.findOne({
          where: {
            id: guess.userId
          }
        });
        return {name, id};
    });
  } catch(e) {
    // TODO add error handling for when getting todays guesses *map assignment
    debugger
  }
  return Promise.all(guessedPlayers);
};

const correctUserGuesses = async () => {
  const gameDate = dateFormat('yyyy-mm-dd');
  let todaysCorrectGuesses = [];
  let correctGuessedPlayers = [];
  const currentHour = new Date().getHours();

  if (currentHour < 15) return false
  try {
    todaysCorrectGuesses = await UserQuestionChoice.findAll({
      where: {
        isCorrect: true,
        updatedAt: {
          $gte: gameDate
        }
      }
    });
  } catch(e) {
    debugger
    // TODO add error handling for when getting todays guesses
  }

  try {
    correctGuessedPlayers = todaysCorrectGuesses.map( async guess => {
        let {name, id} = await User.findOne({
          where: {
            id: guess.userId
          }
        });
        return {name, id};
    });
  } catch(e) {
    // TODO add error handling for when getting todays guesses *map assignment
    debugger
  }
  return Promise.all(correctGuessedPlayers);
}

module.exports = {
  allUsers,
  userScores,
  currentUserGuesses,
  correctUserGuesses
}