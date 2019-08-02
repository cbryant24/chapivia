import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { TYPOGRAPHY, CURSOR, TRANSITION, TEXTDECORATION } from './utils';

const Button = styled(Box)`
  ${TYPOGRAPHY} ${CURSOR} ${TRANSITION} ${TEXTDECORATION}
`

Button.displayName = 'Button';
debugger
Button.defaultProps = {
  // ...theme.button,
  backgroundColor: 'primary',
  color: 'white',
  fontSize: 3,
  margin: 0,
  px: 3,
  py: 2
};

export default Button;