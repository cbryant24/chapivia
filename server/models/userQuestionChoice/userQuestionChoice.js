'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserQuestionChoice = sequelize.define('userQuestionChoice', {
    isCorrect: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    questionChoiceId: DataTypes.INTEGER
  },{
    freezeTableName: true,
  });
  UserQuestionChoice.associate = async function(models) {
    // associations can be defined here
    UserQuestionChoice.belongsTo(models.QuestionChoice);
  };

  UserQuestionChoice.recordGuess = async function(guessData) {
    const { 
      userId,
      questionId,
      questionChoiceId,
      guess
    } = guessData;
    try {
      const { correctChoice } = await this.associations.questionChoice.target.findById(questionChoiceId);
    
      const priorGuess = await this.find({
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

      const usersGuess = await this.create({
        userId,
        questionId,
        questionChoiceId,
        isCorrect: correctChoice === guess ? true : false
      });

      return usersGuess;
    } catch(e) {
      //TODO add error handling for recording user guess
      debugger
    }
  }

  return UserQuestionChoice;
};