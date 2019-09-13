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
      return question.dailyQuestion();
    },
    user: (parent, args, { req }, info) => {
      return req.user;
    },
    nonGuessedPlayers: (parent, args, { user }, info) => {
      return user.getUnguessedPlayers();
    }
  },
  Mutation: {
    login: (parent, { email, password }, { cookieLogin, req }, info) => {
      return cookieLogin({ email, password, req });
    },
    signup: (parent, { email, name, password}, { cookieSignup }, info ) => {
      return cookieSignup({ email, password, req });
    },
    logout: (parent, args, { req }, info) => {
      req.logout();
      const { user } = req;
      return user;
    }
  }
}