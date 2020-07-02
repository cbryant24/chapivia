import gql from 'graphql-tag';

export default gql`
	{
		correctGuesses {
			id
			name
		}
	}
`;
