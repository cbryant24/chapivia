import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { TYPOGRAPHY, CURSOR, TRANSITION } from './utils';

import { system } from 'styled-system';

const Button = styled(Box)`
  ${TYPOGRAPHY} ${TRANSITION}
`

Button.displayName = 'Button';

Button.defaultProps = {
  // ...theme.button,
  backgroundColor: 'primary',
  color: 'white',
  //fontSize: [1,2],
  margin: 0,
  px: 3,
  py: 2
};

export default Button;