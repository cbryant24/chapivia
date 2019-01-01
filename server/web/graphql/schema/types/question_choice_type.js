const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = graphql;
const { Question } = require('../../../../models');

const QuestionChoiceType = new GraphQLObjectType({
  name: 'QuestionChoiceType',
  fields: () => ({
    id: { type: GraphQLID },
    correctChoice: { type: GraphQLString },
    incorrectChoiceOne: { type: GraphQLString },
    incorrectChoiceTwo: { type: GraphQLString },
    incorrectChoiceThree: { type: GraphQLString },
  })
});

module.exports = QuestionChoiceType;