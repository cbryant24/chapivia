const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const QuestionChoiceType = require('./question_choice_type');
const { QuestionChoice } = require('../../../../models');

const QuestionType = new GraphQLObjectType({
  name: 'QuestionType',
  fields: () => ({
    id: { type: GraphQLID },
    question: { type: GraphQLString },
    correctChoice: { type: GraphQLString },
    questionChoice: {
      type: QuestionChoiceType,
      resolve(parentValue) {
        return QuestionChoice.find({where: { questionId: parentValue.id } });
      }
    }
  })
});

module.exports = QuestionType;