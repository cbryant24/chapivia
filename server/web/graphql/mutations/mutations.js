const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;
const { UserType, TriviaType } = require('../schema/types');
const AuthMiddleware = require('../../middleware');
const { UserQuestionChoice } = require('../../../models');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, {name, email, password}, req) {
        return AuthMiddleware.cookieSignup({ name, email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password}, req) {
        return AuthMiddleware.cookieLogin({ email, password, req});
      }
    },
    guess: {
      type: TriviaType,
      args: {
        userId: { type: GraphQLString },
        questionId: { type: GraphQLString },
        questionChoiceId: { type: GraphQLString },
        guess: { type: GraphQLString }
      },
      resolve(parentValue, { userId, questionId, questionChoiceId, guess }, req) {
        return UserQuestionChoice.recordGuess({ userId, questionId, questionChoiceId, guess, req });
      }
    }
  }
});

module.exports = mutation;