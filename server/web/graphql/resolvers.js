module.exports = {
  // Question: {
  //   questions: (parent, args, context, info) => {
  //     debugger
  //   }
  // },
  // User: {
  //   user: (parent, args, context, info) => {
  //     debugger
  //   }
  // },
  Query: {
    dailyTrivia: (parent, { id }, { question } , info) => {
      debugger
      return question.dailyQuestion()
    }
  },
  Mutation: {
    login: (parent, { email, password }, { cookieLogin }, info) => {
      debugger
    }
  }
}