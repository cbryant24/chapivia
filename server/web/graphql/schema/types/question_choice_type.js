const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = graphql;

const QuestionChoiceType = new GraphQLObjectType({
  name: 'QuestionChoiceType',
  fields: () => ({
    id: { type: GraphQLID },
    choices: { type: new GraphQLList(GraphQLString) }
  })
});

module.exports = QuestionChoiceType;