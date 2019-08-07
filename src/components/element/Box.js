import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { SPACE, COLOR, LAYOUT, APPEARANCE, FONTSIZESMODULES } from './utils';
import { fontStyle, backgroundColor } from '../elements/theme';
import cleanElement from 'clean-element';
import { content, transform, transformOrigin } from '../elements/theme';
import { filterProps } from './utils/index';

const Base = props => {

  const Div = styled.div``;
  const next = filterProps(props);
  // debugger
  return <Div {...next} />;
}

const Box = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  LAYOUT, SPACE, COLOR, APPEARANCE, FONTSIZESMODULES
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;