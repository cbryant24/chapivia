'use strict'
const { QuestionChoice, UserQuestionChoice } = require('../../../../models');


const userGuess = async function(playerGuess) {
  try {
    const { playerId: userId, questionChoiceId, questionId, guess} = playerGuess;

    const { correctChoice } = await QuestionChoice.findByPk(questionChoiceId);
    const priorGuess = await UserQuestionChoice.findOne({
      where: {
        questionId,
        userId
      }
    });

    if (priorGuess) {
      priorGuess.isCorrect = correctChoice === guess ? true : false;
      const updatedGuess = await priorGuess.save();
      return updatedGuess;
    }

    const {_options: {isNewRecord: guessRecorded }} = await UserQuestionChoice.create({
      userId,
      questionId,
      questionChoiceId,
      isCorrect: correctChoice === guess ? true : false
    });

    return guessRecorded
  } catch(e) {
    console.log(e);
    //TODO add error handling for recording user guess
  }
}

module.exports = {
  userGuess
}
