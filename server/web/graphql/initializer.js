const { ApolloServer, gql } = require("apollo-server-express");
// const { typeDefs, resolvers } = require('./schema');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
// const { sequelizeConnection: sequelize } = require('../../db');
const {
  User,
  Question,
  QuestionChoice,
  UserQuestionChoice
} = require("../../models");
const { cookieSignup, cookieLogin } = require("../auth");

const db = {
  user: User,
  question: Question,
  questionChoice: QuestionChoice,
  userQuestionChoice: UserQuestionChoice
};

const { app } = require("../initializer");

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...db,
      cookieSignup,
      cookieLogin,
      req
    };
  }
});

server.applyMiddleware({ app });

module.exports = {
  initializer: () => server
};
