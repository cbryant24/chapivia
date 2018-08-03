const User = require('./user');
const QuestionChoice = require('./questionChoice');
const Question = require('./question');

QuestionChoice.Question = QuestionChoice.belongsTo(Question);

module.exports = {
  User,
  QuestionChoice,
  Question
}