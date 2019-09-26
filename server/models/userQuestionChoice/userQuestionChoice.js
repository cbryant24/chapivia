'use strict';
const moment = require('moment');
const validate = require('../../config/schemas');

module.exports = (sequelize, DataTypes) => {
  var UserQuestionChoice = sequelize.define('userQuestionChoice', {
    isCorrect: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    questionChoiceId: DataTypes.INTEGER,
    guess: DataTypes.STRING
  },{
    freezeTableName: true,
  });
  UserQuestionChoice.associate = async function(models) {
    // associations can be defined here
    UserQuestionChoice.belongsTo(models.QuestionChoice, { through: "userGuesses" });
  };

  UserQuestionChoice.recordGuess = async function(guessData) {
    const { 
      userId,
      questionId,
      questionChoiceId,
      guess
    } = guessData;
    debugger
    const valid = validate.guess({ userId, questionId, questionChoiceId, guess });
    
    if (!valid) { throw new Error("Invalid character used in field") }    

    const currentHour = moment().format('HH');

    // if (currentHour >= 18) return null;
    
    try {
      const { correctChoice } = await this.associations.questionChoice.target.findByPk(questionChoiceId);
    
      const priorGuess = await this.findOne({
        where: {
          questionId,
          userId
        }
      });

      if (priorGuess) {
        priorGuess.isCorrect = correctChoice === guess ? true : false;
        priorGuess.guess = guess;
        const updatedGuess = await priorGuess.save();
        
        return updatedGuess;
      }

      const usersGuess = await this.create({
        userId,
        questionId,
        questionChoiceId,
        guess,
        isCorrect: correctChoice === guess ? true : false
      });

      return usersGuess;
    } catch(e) {
      //TODO: add error handling for recording user guess
      debugger
    }
  }

  return UserQuestionChoice;
};