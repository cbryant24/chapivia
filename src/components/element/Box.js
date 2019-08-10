import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { SPACE, COLOR, LAYOUT, APPEARANCE, FONTSIZESMODULES, ZINDEX } from './utils';
import cleanElement from 'clean-element';
import { filterProps } from './utils';

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
  LAYOUT, SPACE, COLOR, APPEARANCE, FONTSIZESMODULES, ZINDEX
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;