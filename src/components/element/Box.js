import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  space, 
  color, 
  layout, 
  background, 
  border, 
  position,
  shadow,
  opacity,
  compose,
  style,
  system
 } from 'styled-system';
import { fontStyle, backgroundColor } from './theme';
import theme from './theme';
import cleanElement from 'clean-element';
import { content, transform, transformOrigin } from './theme';
import { filterProps } from './utils/index';

const Base = props => {

  const next = filterProps(props);
  return <div {...next} />;
}


const Box = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space, color, layout, background, shadow, transformOrigin, transform, content,
  position, border
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;