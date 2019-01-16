import React from 'react';
import { FlexItem, Text } from './elements';
import { css, keyframes } from 'styled-components';

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
        fontSize="6rem"
        zIndex="5"
      >
        Chapivia
      </Text.p>
      <Text.p 
        caps 
        fontSize="6rem"
        position="absolute"
        top="0"
        left="0"
        zIndex="10"
        color="hsl(260, 90%, 80%)"
        clipPath="inset(0% 0% 60% 0%)"
        animation_one="1000ms steps(1) alternate infinite"
      >
        Chapivia
      </Text.p>
      <Text.p 
        caps 
        fontSize="6rem"
        position="absolute"
        top="0"
        left="0"
        zIndex="10"
        color="hsl(260, 90%, 80%)"
        clipPath="inset(60% 0% 0% 0%)"
        animation_two="1000ms steps(1) alternate infinite"
      >
        Chapivia
      </Text.p>
      <FlexItem
        position="absolute"
        left="0"
        top="20%"
        height="50%"
        width="100%"
        backgroundColor="hsl(225, 100%, 40%)"
        zIndex="-1"
        animation="20s steps(1) infinite"
      >
      </FlexItem>
      <FlexItem
        position="absolute"
        height="100%"
        width="100%"
        top="0"
        left="0"
        zIndex="100"
        backgroundImage="linear-gradient(
          to bottom,
          rgba(0,0,0,0.5) 0%,
          rgba(0,0,0,0.5) 50%,
          rgba(0,0,0,0) 50%,
          rgba(0,0,0,0) 100%
        )"
        backgroundSize="100% 2px"
      >
      </FlexItem>
    </FlexItem>
  )
}