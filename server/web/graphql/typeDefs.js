const { gql } = require('apollo-server-express');

//POSSIBLE RENAME QUESTION TO TRIVIA!!
const typeDefs = gql`
  type Query {
    dailyTrivia: Question!
  }

  type Mutation {
    login(email: String, password: String): User!
  }

  # type DailyTrivia {
  #   question: Question
  # }

  type Question {
    id: ID!
    question: String!
    is_used: Boolean
    difficulty: String
    category: String
    questionChoices: [QuestionChoice]
  }

  type QuestionChoice {
    id: ID!
    correctChoice: String!
    incorrectChoiceOne: String!
    incorrectChoiceTwo: String!,
    incorrectChoiceThree: String!,
    questionId: Int!,
  }

  type User {
    id: ID!
    name: String
    email: String
  }
`

module.exports = typeDefs;