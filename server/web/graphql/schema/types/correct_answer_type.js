const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const QuestionType = require('./question_type')

const CorrectAnswerType = new GraphQLObjectType({
  name: 'CorrectAnswerType',
  fields: () => ({
    id: { type: GraphQLID },
    correctChoice: { type: GraphQLString },
    question: { type: QuestionType }
  })
});

module.exports = CorrectAnswerType;