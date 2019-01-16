'use strict';
const { triviaConfig } = require('../../config/');
const dateFormat = require('dateformat');
const Nedb = require('../nedb');

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

  Question.dailyQuestion = async function() {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const gameDate = dateFormat('yyyy-mm-dd');
    let currentHour = new Date().getHours();
    
    const dailyQuestion = await this.findOne({ 
      where: {
        category: triviaConfig[dayOfWeek],
        difficulty: 'medium',
        is_used: 'false'
    }});
    
    return dailyQuestion
  }
  return Question;
};