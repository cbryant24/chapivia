import gql from 'graphql-tag';

export const MODAL_STATUS = gql`
  {
    modal @client {
      isOpen
      modalMessage
    }
  }
`;