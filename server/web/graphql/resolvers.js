module.exports = {
  Question: {
    triviaChoices: (parent, args, { questionChoice }, info) => {
      return questionChoice.findOne({ where: { questionId: parent.id } })
    }
  },
  Query: {
    dailyTrivia: (parent, { id }, { question } , info) => {
      return question.dailyQuestion();
    },
    user: (parent, args, { req }, info) => {
      return req.user;
    },
    nonGuessedPlayers: (parent, args, { user }, info) => {
      return user.getUnguessedPlayers();
    },
    guessedPlayers: (parent, args, { user }, info) => {
      return user.todaysGuesses();
    },
    scores: (parent, args, { user }, info) => {
      return user.scores();
    },
    triviaSolution: (parent, args, { questionChoice }, info) => {
      return questionChoice.getTriviaAnswer();
    },
    correctGuesses: (parent, args, { user }, info) => {
      debugger
      return user.correctGuesses();
    },
    prevMonthWinner: (parent, args, { user }, info) => {
      return user.prevMonthWinner();
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
    },
    guess: (parent, { userId, questionId, questionChoiceId, guess}, { req, userQuestionChoice }, info) => {
      return userQuestionChoice.recordGuess({ userId, questionId, questionChoiceId, guess });
    }
  }
}