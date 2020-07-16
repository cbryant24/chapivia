import gql from 'graphql-tag';

export default gql`
	{
		scores {
			id
			name
			score
		}
	}
`;
