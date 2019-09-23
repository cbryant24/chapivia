const { ApolloServer, gql } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schema');
const  typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
// const { sequelizeConnection: sequelize } = require('../../db');
const { 
  User, 
  Question,
  QuestionChoice,
  UserQuestionChoice
} = require('../../models');
const { cookieSignup, cookieLogin } = require('../auth');

const db = {
  user: User,
  question: Question,
  questionChoice: QuestionChoice,
  userQuestionChoice: UserQuestionChoice
}
// debugger
const { app } = require('../initializer');
// debugger
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context: ({ req }) => {
    return { 
      ...db, 
      cookieSignup, 
      cookieLogin,
      req
    }
  }
});
// debugger
server.applyMiddleware({ app });

module.exports = {
  initializer: () => server
}
