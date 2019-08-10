import React from 'react';
import styled from 'styled-components';

import Box from './Box';
import { addPsuedo } from './utils';

const PsuedoBox = styled(Box)`
  &:first-child:hover {
    font-size: 42px
  }
`

PsuedoBox.displayName = 'PsuedoBox';

export default PsuedoBox;