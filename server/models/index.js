const sequelizeUser = require('./user');
const sequelizeQuestionChoice = require('./questionChoice');
const sequelizeQuestion = require('./question');
const sequelizeUserQuestionChoice = require('./userQuestionChoice');

const models = {
  User: sequelizeUser,
  QuestionChoice: sequelizeQuestionChoice,
  Question: sequelizeQuestion,
  UserQuestionChoice: sequelizeUserQuestionChoice
}

sequelizeUser.associate(models);
sequelizeQuestionChoice.associate(models);
sequelizeQuestion.associate(models);
sequelizeUserQuestionChoice.associate(models);

module.exports = {
  User: sequelizeUser,
  QuestionChoice: sequelizeQuestionChoice,
  Question: sequelizeQuestion,
  UserQuestionChoice: sequelizeUserQuestionChoice,
};