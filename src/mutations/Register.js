import gql from 'graphql-tag';

export default gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, name: $name, password: $password) {
			id
			name
			email
		}
	}
`;
