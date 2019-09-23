// // const graphql = require('graphql');
// // const { GraphQLSchema } = graphql;

// // const { RootQueryType } = require('./types');
// // const { mutation } = require('../mutations');

// // module.exports = new GraphQLSchema({
// //   query: RootQueryType,
// //   mutation
// // });

// const { gql } = require('apollo-server-express');

// //POSSIBLE RENAME QUESTION TO TRIVIA!!
// const typeDefs = gql`
//   type Query {
//     question(id: ID!): Question
//   }

//   type Question {
//     id: ID!
//     question: String!
//     is_used: Boolean
//     difficulty: String
//     category: String
//     questionChoice: [QuestionChoice]
//   }

//   type QuestionChoice {
//     id: ID!
//     correctChoice: String!
//     incorrectChoiceOne: String!
//     incorrectChoiceTwo: String!,
//     incorrectChoiceThree: String!,
//     questionId: Int!,
//   }

//   type User {
//     id: ID!
//     name: String!
//     email: String!
//   }
// `

// module.exports = typeDefs;