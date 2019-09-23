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
`