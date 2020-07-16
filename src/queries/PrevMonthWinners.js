import gql from 'graphql-tag';

export default gql`
	{
		prevMonthWinners {
			name
			score
		}
	}
`;
