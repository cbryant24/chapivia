import React from 'react';
import { system } from 'styled-system';
import styled from 'styled-components';
import { POSITION, FLEX, GRID } from './utils';
import { cssProperties, addStyles } from './utils';
import Box from './Box';

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