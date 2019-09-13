const { gql } = require('apollo-server-express');

//POSSIBLE RENAME QUESTION TO TRIVIA!!
const typeDefs = gql`
  type Query {
    dailyTrivia: Question!
    user: User
    nonGuessedPlayers: User
  }

  type Mutation {
    login(email: String, password: String): User!,
    logout: User
    signup(email: String, password: String, name: String): User
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
    triviaChoices: QuestionChoice
  }

  type QuestionChoice {
    id: ID!
    choices: [String!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`

module.exports = typeDefs;