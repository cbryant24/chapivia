import React from 'react';
import { propTypes } from 'styled-system';
import { keyframes } from 'styled-components'
import Box from './Box';
import theme from './theme';

const glitchAnimation = () => {
  return keyframes`
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  `
}

const joltAnimation = () => {
  let keyframeVals = '';

  for (let i = 0; i <= 50; i++) {
    keyframeVals += `${Math.floor((i*(1/50) * 100))}% { 
      transform: translate(${(Math.floor(Math.random() * 10) + 1)-5}px, ${(Math.floor(Math.random() * 10) + 1)-5}px) 
    }\n`
  }
  
  return keyframes`
    ${keyframeVals}
    1% {
      transform: scaleY(1) skewX(0deg);
    }
    1.5% {
      transform: scaleY(3) skewX(-60deg);
    }
    2% {
      transform: scaleY(1) skewX(0deg);
    }
    51% {
      transform: scaleX(1) scaleY(1) skewX(0deg);
    }
    52% {
      transform: scaleX(1.5) scaleY(.2) skewX(80deg);
    }
    53%{
      transform: scaleX(1) scaleY(1) skewX(0deg);
    }
  `;
};

const noiseAnimation = () => {
  let keyframeVals = '';

  for (let i =0; i <= 300; i++) {
    keyframeVals += `${(i * (1/300) * 100)}% {
      clip: rect(${Math.floor(Math.random() * 100)+1}px, 9999px, ${Math.floor(Math.random() * 99)+1}px, 0);
    }\n`
  }
  debugger
  return keyframes`${keyframeVals}`;
};



const Span = Box.span.extend`
  animation: ${props => props.glitchAnimation ? `${glitchAnimation()} 2s linear infinite` : '' };
  animation: ${props => props.joltAnimation ? `${joltAnimation()} 2s linear infinite` : ''};
  ${props => props.glitchBefore && props.glitchAfter ? `
    &:before, &:after {
      content: 'Winners';
      position: absolute;
      top: 0;
      background: inherit;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
    }
      

    &:before {
        left: -4.5px;
        text-shadow: calc(4.5px / 2.5) 0 blue;
        animation: ${noiseAnimation()} 39s linear infinite alternate-reverse;
    }

    &:after {
        left: 4.5px;
        text-shadow: calc(-4.5px / 2.5) 0 red;
        animation: ${noiseAnimation()} 24s linear infinite alternate-reverse;
    }
  `: '' }
  
`


Span.defaultProps = {
  theme
}

Span.propTypes = {

};

Span.displayName = 'Span';

export default Span;
