import React from 'react';
import styled from 'styled-components';
import { flex } from 'styled-system';
import Input from './Input';

const InputContainer = styled(Input)`
  flex
`

InputContainer.defaultProps = {
  display: 'flex'
}

export default InputContainer;