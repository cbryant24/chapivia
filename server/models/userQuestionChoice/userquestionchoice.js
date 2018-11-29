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
  UserQuestionChoice.associate = function(models) {
    // associations can be defined here
  };
  return UserQuestionChoice;
};