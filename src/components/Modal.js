import React from 'react';
import {
  StyledModal,
  BounceAnimations,
  Div,
  Ul,
  Li,
  Button,
  P
} from '@cbryant24/styled-react';

export default ({ isOpen, toggleModal, modalMessage, afterClose }) => {
  return (
    <StyledModal
      id="chapivia-modal"
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      modalBackgroundStyle={{ themeStyle: 'modalBackgroundStyle' }}
      allowScroll={false}
      afterClose={afterClose}
    >
      <Div
        themeStyle={['modalContainer']}
        animation={{
          in: BounceAnimations.BounceInTop,
          duration_in: 1,
          animation_fill_mode: 'both'
        }}
      >
        <Ul textAlign="center" my={[1]}>
          {Array.isArray(modalMessage) ? (
            modalMessage.map(message => (
              <Li key={message}>{message.message}</Li>
            ))
          ) : (
            <Li>
              <P>{modalMessage}</P>
            </Li>
          )}
        </Ul>
        <Button
          themeStyle={['squareButton', 'marginSmall']}
          alignSelf="flex-end"
          onClick={toggleModal}
        >
          Close
        </Button>
      </Div>
    </StyledModal>
  );
};
