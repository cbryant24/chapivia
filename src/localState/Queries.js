import gql from 'graphql-tag';

export const DAILY_TRIVIA = gql`
	{
		localTrivia @client {
			questionId
			question
			questionChoicesId
			questionChoices
			category
		}
	}
`;
