import React from 'react';
import { system } from 'styled-system';
import styled from 'styled-components';
import { POSITION, FLEX, GRID } from './constants';
import { cssProperties, offset, objectFit } from './css-helpers';
import Box from './Box';

const addStyles = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

const BackgroundModal = styled(Box)(
  props => addStyles(props),
  POSITION, FLEX, GRID
);

BackgroundModal.defaultProps = {
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 30,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  alignItems: 'center',
  justifyContent: 'center'
}

export default BackgroundModal;