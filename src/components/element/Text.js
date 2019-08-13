import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  typography,
  color,
  shadow,
  position
} from 'styled-system';
import cleanElement from 'clean-element';
import { clipPath, textTransform } from './utils/cssHelpers';
import { filterProps } from './utils/index'

const Base = props => {
  // debugger
  const P = styled.p``;
  const next = filterProps(props);
  return <P {...next} />;
}

const Text = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  typography, color, shadow, position, clipPath, textTransform
);

Text.displayName = 'Text'

export default Text;