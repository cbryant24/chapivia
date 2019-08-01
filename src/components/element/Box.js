import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { SPACE, COLOR, LAYOUT, APPEARANCE } from './utils';
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
  LAYOUT, SPACE, COLOR, APPEARANCE
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;