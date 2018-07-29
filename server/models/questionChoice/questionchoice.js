'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuestionChoice = sequelize.define('QuestionChoice', {
    correctChoice: DataTypes.STRING,
    incorrectChoiceOne: DataTypes.STRING,
    incorrectChoiceTwo: DataTypes.STRING,
    incorrectChoiceThree: DataTypes.STRING
  }, {});
  QuestionChoice.associate = function(models) {
    // associations can be defined here
    QuestionChoice.belongsTo(models.Question)
  };
  return QuestionChoice;
};