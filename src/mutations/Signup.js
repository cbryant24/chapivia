import gql from 'graphql-tag';

export default gql`
  mutation Signup($email: String, $password: String, $name: String) {
    signup(email: $email, name: $name, password: $password ) {
      id,
      name
      email
    }
  }
`;