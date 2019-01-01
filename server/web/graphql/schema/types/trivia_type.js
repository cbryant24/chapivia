const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const TriviaType = new GraphQLObjectType({
  name: 'TriviaType',
  fields: {
    userId: { type: GraphQLString },
    questionId: { type: GraphQLString },
    questionChoiceId: { type: GraphQLString },
    guess: { type: GraphQLString }
  }
});

module.exports = TriviaType;