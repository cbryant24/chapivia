'use strict';
const { triviaConfig } = require('../../config/config');
const dateFormat = require('dateformat');
const Nedb = require('../nedb');
const { concat, shuffle } =  require('lodash');

module.exports = (sequelize, DataTypes) => {
  var QuestionChoice = sequelize.define('questionChoice', {
    correctChoice: DataTypes.STRING,
    incorrectChoiceOne: DataTypes.STRING,
    incorrectChoiceTwo: DataTypes.STRING,
    incorrectChoiceThree: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    
  }, {
    hooks: {
      afterFind: function(questionChoices) {
        questionChoices.choices = shuffle([
          questionChoices.correctChoice,
          questionChoices.incorrectChoiceOne,
          questionChoices.incorrectChoiceTwo,
          questionChoices.incorrectChoiceThree,
        ]);
        return questionChoices;
      }
    },
    freezeTableName: true,
  });
  QuestionChoice.associate = function(models) {
    debugger
    // associations can be defined here
    QuestionChoice.belongsTo(models.Question);
    QuestionChoice.belongsToMany(models.Question, {through: 'userQuestionChoice'});
  };

  return QuestionChoice;
};
