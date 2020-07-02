import gql from 'graphql-tag';

export default gql`
	{
		dailyTrivia {
			id
			question
			category
			triviaChoices {
				id
				choices
			}
		}
	}
`;
