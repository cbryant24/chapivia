'use strict';
const { triviaConfig } = require('../../config/');
const moment = require('moment');


module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('question', {
    question: DataTypes.STRING,
    is_used: DataTypes.BOOLEAN,
    difficulty: DataTypes.STRING,
    category: DataTypes.STRING,
    dateUsed: DataTypes.DATEONLY
  }, {
    freezeTableName: true,
  });
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsToMany(models.QuestionChoice, {through: 'userQuestionChoice'});

  };

  Question.dailyQuestion = async function() {
    const dayOfWeek = new Date().getDay();
    const todaysDate = moment().format('YYYY-MM-DD');
    const previousGameDate = dayOfWeek === 1 ? 
      moment().add(-3, 'day').format('YYYY-MM-DD') : moment().add(-1, 'day').format('YYYY-MM-DD');
    
    // if (dayOfWeek === 0 || dayOfWeek === 6) return null
    
    try {
      let dailyQuestion = await this.findOne({ 
        where: {
          category: triviaConfig[dayOfWeek],
          dateUsed: todaysDate 
      }});
    
      if( !dailyQuestion ) {
        dailyQuestion = await this.findOne({ 
          where: {
            category: triviaConfig[dayOfWeek],
            difficulty: 'medium',
            dateUsed: null
        }});

        if (!dailyQuestion) {
          dailyQuestion = await this.findOne({
            where: {
              category: triviaConfig[dayOfWeek],
              difficulty: 'hard',
              dateUsed: null
            }
          })
        }

        if (!dailyQuestion) {
          dailyQuestion = await this.findOne({
            where: {
              category: triviaConfig[dayOfWeek],
              difficulty: 'easy',
              dateUsed: null
            }
          })
        }

        dailyQuestion.dateUsed = todaysDate;
        dailyQuestion.save();
      }

      dailyQuestion.previousGameQuestion = await this.findOne({ 
        where: {
          dateUsed: previousGameDate 
      }});
      // debugger
      return dailyQuestion || "Out Of Questions!"
    } catch(e) {
      debugger
      console.log(e)
    }
  }

  return Question;
};