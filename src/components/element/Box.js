import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { SPACE, COLOR, LAYOUT, APPEARANCE, FONTSIZESMODULES, ZINDEX, addPseudo } from './utils';
import cleanElement from 'clean-element';
import { filterProps } from './utils';

import css from '@styled-system/css';

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
  addPseudo,
  LAYOUT, SPACE, COLOR, APPEARANCE, FONTSIZESMODULES, ZINDEX
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;