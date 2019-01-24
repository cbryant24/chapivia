const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const ScoreType = new GraphQLObjectType({
  name: 'ScoreType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    score: { type: GraphQLString }
  }
});

module.exports = ScoreType;