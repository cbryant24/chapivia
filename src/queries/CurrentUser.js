import gql from 'graphql-tag';

export default gql`
  {
    user @client {
      id
      name
      email
    }
  }
`;
