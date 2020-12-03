const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const {
	User,
	Question,
	QuestionChoice,
	UserQuestionChoice,
} = require('../../models');

const { cookieRegister, cookieLogin } = require('../auth');

const db = {
	user: User,
	question: Question,
	questionChoice: QuestionChoice,
	userQuestionChoice: UserQuestionChoice,
};

const { app } = require('../initializer');

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers,
	context: ({ req }) => {
		return {
			...db,
			cookieRegister,
			cookieLogin,
			req,
		};
	},
});

server.applyMiddleware({ app });

module.exports = {
	initializer: () => server,
};
