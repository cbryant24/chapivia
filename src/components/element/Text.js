import React from 'react';
import styled from 'styled-components';
import { COMMON, TYPOGRAPHY, addPseudo } from './utils';
import cleanElement from 'clean-element';
import { clipPath, textTransform } from './utils/cssHelpers';
import { filterProps } from './utils/index'

const Base = props => {
  const { isA, ...newProps} = props;
  const next = filterProps(newProps);
  const type = isA || 'p';

  //TODO: Check if issue with children being passed here
  const cleanedElement = React.createElement(type, {...next}, props.children)

  return cleanedElement;
}

const Text = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  addPseudo,
  COMMON, TYPOGRAPHY
);

Text.displayName = 'Text'

export default Text;