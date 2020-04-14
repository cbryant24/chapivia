import React from "react";
import {
  StyledModal,
  Div,
  Ul,
  Li,
  Button,
  P
} from "@cbryant24/styled-react";
// import { dropInFromTop } from './style';

export default ({ isOpen, toggleModal, modalMessage, afterClose }) => {
  const dropInFromTop = {
    in: {
      "0%": {
        transform: "translateY(-1000px)",
        visibility: "hidden",
        "animation-timing-function": "ease-in",
        opacity: 0
      },
      "38%": {
        transform: "translateY(0)",
        visibility: "visible",
        "animation-timing-function": "ease-out",
        opacity: 1
      },
      "55%": {
        transform: "translateY(-65px)",
        "animation-timing-function": "ease-in"
      },
      "72%": {
        transform: "translateY(0)",
        "animation-timing-function": "ease-out"
      },
      "81%": {
        transform: "translateY(-28px)",
        "animation-timing-function": "ease-in"
      },
      "90%": {
        transform: "translateY(0)",
        "animation-timing-function": "ease-out"
      },
      "95%": {
        transform: "translateY(-8px)",
        "animation-timing-function": "ease-in"
      },
      "100%": {
        transform: "translateY(0)",
        "animation-timing-function": "ease-out"
      }
    },
    duration_in: 1,
    animation_fill_mode: "both"
  };

  return (
    <StyledModal
      id="chapivia-modal"
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
      modalBackgroundStyle={{ themeStyle: "modalBackgroundStyle" }}
      allowScroll={false}
      afterClose={afterClose}
    >
      <Div themeStyle={["modalContainer"]} animation={dropInFromTop}>
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
          themeStyle={["squareButton", "marginSmall"]}
          alignSelf="flex-end"
          onClick={toggleModal}
        >
          Close
        </Button>
      </Div>
    </StyledModal>
  );
};
