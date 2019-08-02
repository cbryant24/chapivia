import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { SPACE, COLOR, LAYOUT, APPEARANCE } from './utils';
import { fontStyle, backgroundColor } from '../elements/theme';
import cleanElement from 'clean-element';
import { content, transform, transformOrigin } from '../elements/theme';
import { filterProps } from './utils/index';

const Base = props => {

  const Div = styled.div``;
  const next = filterProps(props);

  return <Div {...next} />;
}

const Box = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => {
    debugger
  },
  LAYOUT, SPACE, COLOR, APPEARANCE
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;