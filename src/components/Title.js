import React from 'react';
import { FlexItem, Text } from './elements';
import { css, keyframes } from 'styled-components';

// const glitch = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `

export default (props) => {
  return (
    <FlexItem
      m="0"
      p="0"
      letterSpacing="4rem"
      filter="drop-shadow(0 0 20px hsla(320, 40%, 60%, 0.8))"
      position="relative"
      zIndex="1"
      fontFamily="'Passion One', cursive"
      fontStyle="italic"
      >
      <Text.p 
        caps 
        color="hsl(320, 90%, 90%)"
        clipPath="inset(40% 0% 40% 0%)"
        fontSize="3rem"
        zIndex="5"
      >
        Chapivia
      </Text.p>
      <Text.p 
        caps 
        fontSize="3rem"
        position="absolute"
        top="0"
        left="0"
        zIndex="10"
        color="hsl(260, 90%, 80%)"
        clip-path="inset(0% 0% 60% 0%)"
      >
        Chapivia
      </Text.p>
      <Text.p 
        caps 
        fontSize="3rem"
        position="absolute"
        top="0"
        left="0"
        zIndex="10"
        color="hsl(260, 90%, 80%)"
        clip-path="inset(60% 0% 0% 0%)"
      >
        Chapivia
      </Text.p>
      <FlexItem></FlexItem>
    </FlexItem>
  )
}