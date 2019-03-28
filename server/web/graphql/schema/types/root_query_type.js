const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const { 
  User, 
  Question,
  QuestionChoice,
} = require('../../../../models');
const UserType = require('./user_type');
// const QuestionChoiceType = require('./question_choice_type');
const QuestionType = require('./question_type');
const ScoreType = require('./score_type');
const CorrectAnswerType = require('./correct_answer_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user
      }
    },
    players: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, req) {
        return User.findAll();
      }
    },
    trivia: {
      type: QuestionType,
      resolve(parentValue, args, req) {
        return Question.dailyQuestion();
      }
    },
    scores: {
      type: new GraphQLList(ScoreType),
      resolve(parentValue, args, req) {
        return User.scores();
      }
    },
    guesses: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, req) {
        return User.todaysGuesses();
      }
    },
    correctGuesses: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, req) {
        return User.correctGuesses();
      }
    },
    correctAnswer: {
      type: CorrectAnswerType,
      resolve(parentValue, args, req) {
        return QuestionChoice.getTriviaAnswer();
      }
    },
    nonGuessedPlayers: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, req) {
        return User.getUnguessedPlayers();
      }
    }
  }
});

module.exports = RootQueryType;