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
    choices: { type: new GraphQLList(GraphQLString) }
  })
});

module.exports = QuestionChoiceType;