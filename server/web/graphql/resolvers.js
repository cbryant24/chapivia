module.exports = {
  // Question: {
  //   questions: (parent, args, context, info) => {
  //     debugger
  //   }
  // },
  Question: {
    choices: async (parent, args, { questionChoice }, info) => {
      // console.log(parent)
      // console.log(context)
      const vals = await questionChoice.find({ where: { questionId: parent.id } })
      debugger
      return vals
    }
  },
  Query: {
    dailyTrivia: (parent, { id }, { question } , info) => {
      // debugger
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
    signup: (parent, { email, name, password}, { cookieSignup, req }, info ) => {
      return cookieSignup({ email, name, password, req });
    },
    logout: (parent, args, { req }, info) => {
      req.logout();
      const { user } = req;
      return user;
    }
  }
}