import gql from 'graphql-tag';

export default gql`
  {
    nonGuessedPlayers {
      id
      name
    }
  }
`;