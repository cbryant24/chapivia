import React from 'react';
import { Modal, BounceAnimations, Div, Ul, Li } from '@cbryant24/styled-react';

export default ({ isOpen, toggleModal, modalMessage }) => {
  return (
    <Modal
      id="chapivia-modal"
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Div
        pseudo
        display="flex"
        fontSizeModule={[3]}
        flexDirection="column"
        justifyContent="space-evenly"
        backgroundColor="black"
        color="white"
        width={['60vw']}
        height={['50vh']}
        margin="auto"
        transform="translateY(-500px)"
        animation={{
          in: BounceAnimations.BounceInTop,
          duration_in: 1,
          animation_fill_mode: 'both'
        }}
      >
        <Ul isA="h3" fontSize={[3, 4]} textAlign="center" my={[3]}>
          {Array.isArray(modalMessage) ? (
            modalMessage.map(message => <Li>{message}</Li>)
          ) : (
            <Li>{modalMessage}</Li>
          )}
        </Ul>
        <Div
          isA="button"
          themeStyle="squareButton"
          width="5em"
          alignSelf="flex-end"
          mr={4}
          mb={4}
          onClick={toggleModal}
        >
          Close
        </Div>
      </Div>
    </Modal>
  );
};
