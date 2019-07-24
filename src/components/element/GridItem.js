import styled from "styled-components";
import React from 'react';
import Box from './Box';
import { alignSelf, justifySelf } from 'styled-system';
import theme from './theme';


const GridItem = styled(Box)`
  grid-row: ${props => props.gridRow};
  grid-column: ${props => props.gridColumn}
  ${alignSelf} ${justifySelf}
`

GridItem.defaultProps = {
  theme,
  gridRow: "auto",
  gridColumn: "auto"
}

GridItem.displayName = 'GridItem';

export default GridItem;