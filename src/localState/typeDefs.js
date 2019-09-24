export default `
  type Query {
    localTrivia: Question
  },

  type Question {
    questionId: Int
    question: String
    questionChoices: [String]
    questionChoicesId: Int
  }

  type User {
    userId: Int,
    name: String,
    email: String,
    role: String
  }
`