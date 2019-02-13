'use strict';
const { triviaConfig } = require('../../config/config');
const dateFormat = require('dateformat');
const Nedb = require('../nedb');
const { concat, shuffle } =  require('lodash');
const moment = require('moment');


module.exports = (sequelize, DataTypes) => {
  const QuestionChoice = sequelize.define('questionChoice', {
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
    // associations can be defined here
    QuestionChoice.belongsTo(models.Question);
    QuestionChoice.belongsToMany(models.Question, {through: 'userQuestionChoice'});
  };

  QuestionChoice.getTriviaAnswer = async function() {
    const currentHour = moment().format('HH');
    const dayOfWeek = new Date().getDay();
    const todaysDate = moment().format('YYYY-MM-DD');
    const previousGameDate = dayOfWeek === 1 ? 
      moment().add(-3, 'day').format('YYYY-MM-DD') : moment().add(-1, 'day').format('YYYY-MM-DD');
    
    try {
      const triviaAnswer = await this.findOne({
        include: [{
          model: this.associations.question.target,
          where: {
            dateUsed: currentHour >= 17 ? todaysDate : previousGameDate
          }
        }]
      });
      
      return triviaAnswer;
    } catch(e) {
      debugger
      //TODO add error handling model QuestionChoice get trivia answer
    }
  }

  return QuestionChoice;
};
