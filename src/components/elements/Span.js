import React from 'react';
import { propTypes } from 'styled-system';
import { keyframes } from 'styled-components'
import Box from './Box';
import theme from './theme';


const noiseAnimation = () => {
  let keyframeVals = '';

  for (let i =0; i <= 20; i++) {
    keyframeVals += `${Math.floor((i * (1/20) * 100))}% {
      clip: rect(${Math.floor(Math.random() * 100)+1}px, 9999px, ${Math.floor(Math.random() * 99)+1}px, 0);
    }\n`
  }
  
  return keyframes`${keyframeVals}`;
};

const Span = Box.span;

Span.glitchAnimation = Box.span.extend`

  animation: ${noiseAnimation()} 2s infinite linear alternate-reverse;
  &:before {
    content: '${props => props.glitchAnimation}';
    position: absolute;
    left:-2px;
    text-shadow:1px 0 blue; 
    color:white;
    overflow:hidden;
    clip:rect(0,900px,0,0); 
    animation: ${noiseAnimation()} 3s infinite linear alternate-reverse;
  }

  &:after {
    content:'${props => props.glitchAnimation}';
    position:absolute;
    left:2px;
    text-shadow:-1px 0 red;
    color:white;
    overflow: hidden;
    clip:rect(0,900px,0,0); 
    animation:${noiseAnimation()} 2s infinite linear alternate-reverse;
  }
`


Span.defaultProps = {
  theme
}

Span.propTypes = {

};

Span.displayName = 'Span';

export default Span;
