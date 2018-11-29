'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('question', {
    question: DataTypes.STRING,
    is_used: DataTypes.BOOLEAN,
    difficulty: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    freezeTableName: true,
  });
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsToMany(models.QuestionChoice, {through: 'userQuestionChoice'});

  };
  return Question;
};