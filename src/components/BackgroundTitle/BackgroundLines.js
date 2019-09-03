import React from 'react';
import { ExtendedBox } from '../element';

const BackgroundLines = (props) => {

  return (
    <ExtendedBox
      id="background-lines"
      backgroundImage="repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 1px, #000 1px, #000 2px
      )"
      backgroundSize="100% 2px, cover"
      transformOrigin="50% 50%"
      transform="rotate(0)"
      content=""
      opacity="0.6"
      top="0"
      left="0"
      borderRadius="2rem"
      height="100%"
      width="100%"
      position="absolute"
      zIndex="5"
    />
  )
}

export default BackgroundLines;