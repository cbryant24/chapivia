import React from 'react';
import { Modal, BoxAll, BounceAnimations, FlexItem, Text } from './element';

export default ({isOpen, toggleModal, modalMessage}) => {
  return (
    <Modal
        id="chapivia-modal"
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
    >
      <BoxAll
        pseudo
        display="flex"
        fontSizeModule={[3]}
        flexDirection="column"
        justifyContent="space-evenly"
        backgroundColor="black"
        color="white"
        width={["50vw", "25vw"]}
        height={["25vh"]}
        margin="auto"
        transform="translateY(-500px)"
        animation={{
          in: BounceAnimations.BounceInTop,
          duration_in: 1,
          animation_fill_mode: 'both'
        }}
      >
        <Text
          isA="h3"
          fontSize={[3,4]}
          textAlign="center"
          my={[4]}
        >
          {modalMessage}
        </Text>
        <FlexItem
          isA="button"
          themeStyle="squareButton"
          width="5em"
          alignSelf="flex-end"
          mr={4}
          onClick={toggleModal}
        >
          Close
        </FlexItem>
      </BoxAll>
    </Modal>
  )
}