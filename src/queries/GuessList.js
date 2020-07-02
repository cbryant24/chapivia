import gql from 'graphql-tag';

export default gql`
	{
		guessedPlayers {
			id
			name
			userQuestionChoices {
				isCorrect
			}
		}
	}
`;
