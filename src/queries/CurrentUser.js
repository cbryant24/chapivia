import gql from 'graphql-tag';

export default gql`
  {
    user {
      id
      name
      email
      role
    }
  }
`;
