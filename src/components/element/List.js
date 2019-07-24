import styled from "styled-components";
import React from 'react';
import Box from './Box';
import { 
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  flex } from 'styled-system';

const List = styled(Box)`
  display: block;
  ${alignSelf} ${alignItems} ${justifyContent} ${flex} ${flexDirection};
`

List.displayName = 'List';

export default List;