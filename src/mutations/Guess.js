import gql from 'graphql-tag';

export default gql `
  mutation Guess( $userId: String, $questionId: String, $questionChoiceId: String, $guess: String) {
    guess( userId: $userId, questionId: $questionId, questionChoiceId: $questionChoiceId, guess: $guess) {
      userId
    }
  }
`