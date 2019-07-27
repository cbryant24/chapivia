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
  compose
 } from 'styled-system';
import { fontStyle, backgroundColor } from './theme';
import theme from './theme';
import cleanElement from 'clean-element';
import { content, transform, transformOrigin } from './theme';
import { filterProps } from './utils/index';
import { cssProperties } from './css-helpers';

const Base = props => {
  // debugger
  
  debugger
  const next = filterProps(props);
  return <div {...next} />;
}

const addStyles = props => {
  const vals = cssProperties;
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = cssProperties[key];
  }
  return cssProps;
}

const Box = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  space, color, layout, background, shadow, transformOrigin, transform, content,
  opacity, position, border
);

export const BoxAnimated = styled(Box)`
${props => props.animation()}
`

export default Box;