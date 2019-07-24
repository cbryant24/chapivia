import React from 'react';
import { 
  form,
  maxWidth,
  justifyContent
} from 'styled-system';
import styled from 'styled-components';
import Flex from './Box';

const FlexForm = styled(Flex)`
  display: flex;
  ${maxWidth}
  ${justifyContent} 
`

export default FlexForm;