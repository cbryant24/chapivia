const { gql } = require('apollo-server-express');

//POSSIBLE RENAME QUESTION TO TRIVIA!!
const typeDefs = gql`
  type Query {
    dailyTrivia: Question!
    user: User
    nonGuessedPlayers: [User]
    guessedPlayers: [User]
    scores: [User]
    triviaSolution: QuestionChoiceAnswer
    correctGuesses: [User]
    prevMonthWinners: [User]
  }

  type Mutation {
    login(email: String!, password: String!): User!
    logout: User
    signup(email: String!, password: String!, name: String!): User
    guess(
      userId: Int!
      questionId: Int!
      questionChoiceId: Int!
      guess: String!
    ): UserQuestionChoice
  }

  # type DailyTrivia {
  #   question: Question
  # }

  type Question {
    id: ID!
    question: String!
    is_used: Boolean
    difficulty: String
    category: String!
    triviaChoices: QuestionChoice
  }

  type QuestionChoice {
    id: ID!
    choices: [String!]
  }

  type QuestionChoiceAnswer {
    correctChoice: String
    question: Question
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String
    score: Int
    userQuestionChoices: [UserQuestionChoice]
  }

  type UserQuestionChoice {
    id: ID!
    userId: Int!
    questionId: Int!
    questionChoiceId: Int!
    guess: String!
    isCorrect: Boolean!
  }
`;

module.exports = typeDefs;
