const User = require('./user');
const QuestionChoice = require('./questionChoice');
const Question = require('./question');
const UserQuestionChoice = require('./userQuestionChoice');
const Nedb = require('./nedb');

QuestionChoice.Question = QuestionChoice.belongsTo(Question);

module.exports = {
  User,
  QuestionChoice,
  Question,
  UserQuestionChoice,
  Nedb
};