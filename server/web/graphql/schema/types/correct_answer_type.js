const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const CorrectAnswerType = new GraphQLObjectType({
  name: 'CorrectAnswerType',
  fields: () => ({
    id: { type: GraphQLID },
    correctChoice: { type: GraphQLString },
  })
});

module.exports = CorrectAnswerType;