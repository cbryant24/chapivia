import gql from 'graphql-tag';

export const MODAL_STATUS = gql`
  {
    modal @client {
      isOpen
      modalMessage
    }
  }
`;

export const DAILY_TRIVIA = gql`
  {
    localTrivia @client {
      questionId
      question
      questionChoicesId
      questionChoices
    }
  }
`