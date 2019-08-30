import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { COMMON, addPseudo } from './utils';
import { filterProps, addThemeStyle } from './utils';
import cleanElement from 'clean-element';
import css from '@styled-system/css';

const Base = props => {
  const { isA, ...newProps} = props;
  const next = filterProps(newProps);
  const type = isA || 'div';

  //TODO: Check if issue with children being passed here
  const element = React.createElement(type, {...next}, props.children)

  return element;
}

const Box = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  COMMON,
  addPseudo,
  addThemeStyle(props),
  props => {
    // debugger
  }
)

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;