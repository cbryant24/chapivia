'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    is_used: DataTypes.BOOLEAN
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};