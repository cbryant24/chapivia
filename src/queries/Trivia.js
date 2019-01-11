import gql from 'graphql-tag';

export default gql`
  {
    trivia {
      id
      question
      questionChoice {
        id
        correctChoice
        choices
      }
    }
  }
`;
