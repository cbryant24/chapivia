import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { 
  space, 
  color, 
  layout, 
  background, 
  border, 
  position,
  shadow,
  opacity,
  compose
 } from 'styled-system';
import { fontStyle, backgroundColor } from './theme';
import theme from './theme';
import cleanElement from 'clean-element';
import { content, transform, transformOrigin } from './theme';
import { filterProps } from './css-helpers'
// import Base from './Base';
import * as cssProperties from './css-helpers';

const Base = props => {
  // debugger
  const next = filterProps(props);
  return <div {...next} />;
}

const addCSSProperties = props => {
  const addedCSSProperties = [];

  for (let prop in props) {
    console.log(cssProperties);
    debugger
  }
}

const Box = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space, color, layout, background, shadow, transformOrigin, transform, content,
  opacity, position, border,
  props => addCSSProperties(props)
  //props => props.objectFit ? `object-fit: contain` : '',
);

export const BoxAnimated = styled(Box)`
${props => props.animation()}
`

export default Box;