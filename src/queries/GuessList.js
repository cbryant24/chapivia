import gql from 'graphql-tag';

export default gql`
  {
    guesses {
      id
      name
    }
  }
`;
