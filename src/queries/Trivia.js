import gql from 'graphql-tag';

export default gql`
  {
    dailyTrivia {
      id
      question
      triviaChoices {
        id
        choices
      }
    }
  }
`;
