'use strict';
const { triviaConfig } = require('../../config/config');
const dateFormat = require('dateformat');
const Nedb = require('../nedb')

module.exports = (sequelize, DataTypes) => {
  var QuestionChoice = sequelize.define('questionChoice', {
    correctChoice: DataTypes.STRING,
    incorrectChoiceOne: DataTypes.STRING,
    incorrectChoiceTwo: DataTypes.STRING,
    incorrectChoiceThree: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    
  }, {
    freezeTableName: true,
  });
  QuestionChoice.associate = function(models) {
    // associations can be defined here
    QuestionChoice.belongsTo(models.Question);
    QuestionChoice.belongsToMany(models.Question, {through: 'userQuestionChoice'});
  };

  return QuestionChoice;
};
