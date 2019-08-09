import React from 'react';
import { bgAnimation, bgGlowAnimation } from '../style/animations';
import { BoxAnimated, Box } from './element';
import Title from './Title';

function Background(props) {
  return (
    <Box
      fontFamily="VT323"
      border-radius="2rem"
      border="1rem solid"
      borderBottom="#121212"
      borderLeft="#080808"
      borderRight="#080808"
      borderTop="#020202"
      alignItems="center"
      background="transparent"
      position="fixed"
      height="96%"
      boxShadow="inset 0 0 18rem #000, inset 0 0 3rem #000, 0 0 10rem #000"
      m="auto"
      width="100%"
      height="auto"
      minHeight="100vh"
    >
      <BoxAnimated 
        animation={bgAnimation}
        display="block"
        p="3rem 2rem"
        backgroundColor="#031e11"
        textShadow="0rem 0.2rem 1rem rgba(3, 30, 17, 1)"
        position="absolute"
        top="0"
        left="0"
        height="100%"
        width="100%"
        zIndex="-1"
      />
      <Box
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
      <BoxAnimated 
        background="radial-gradient(
          circle at center,
          rgba(27,212,89,1) 0%,
          rgba(27,212,89,0.88) 58%,
          rgba(21,235,92,0.57) 80%,
          rgba(19,94,29,0.27) 93%,
          rgba(10,23,12,0) 100%
        );"
        top="0"
        left="0"
        height="100%"
        width="100%"
        opacity="0.5"
        position="fixed"
        animation={bgGlowAnimation}
      />
      {/* <Title /> */}
    </Box>
  )
}

export default Background;