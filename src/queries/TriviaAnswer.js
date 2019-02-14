import gql from 'graphql-tag';

export default gql`
{
  correctAnswer {
    correctChoice
    question {
      question
    }
  }
}
`;
