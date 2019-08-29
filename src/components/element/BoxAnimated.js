import React from 'react';
import styled from 'styled-components';
import cleanElement from 'clean-element';
import css from '@styled-system/css';

import { filterProps } from './utils';
import { getAnimation } from './animations';
import Box from './Box';
import { ALL } from './utils';


const Box = styled(Box)(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => {
    if (!props.animation) return;

    const animationProperties = getAnimation(props);
    return (
      css`
        animation-name: ${animationProperties.animation};
        animation-duration: ${animationProperties.duration};
        animation-iteration-count: ${animationProperties.iteration};
        animation-timing-function: ${animationProperties.animationTimingFunction};
        animation-direction: ${animationProperties.animationDirection};
        animation-fill-mode: ${animationProperties.animationFillMode};
        animation-play-state: running;
      `
    );
  },
  ALL,
  props => addStyles(props)
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;