import gql from 'graphql-tag';

export default gql`
	mutation Guess(
		$userId: Int!
		$questionId: Int!
		$questionChoiceId: Int!
		$guess: String!
	) {
		guess(
			userId: $userId
			questionId: $questionId
			questionChoiceId: $questionChoiceId
			guess: $guess
		) {
			isCorrect
		}
	}
`;
