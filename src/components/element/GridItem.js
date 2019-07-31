import styled from "styled-components";
import React from 'react';
import Box from './Box';
import { grid } from 'styled-system';
import theme from './theme';


const GridItem = styled(Box)`
  ${grid}
`

GridItem.defaultProps = {
  theme,
  gridRow: "auto",
  gridColumn: "auto"
}

GridItem.displayName = 'GridItem';

export default GridItem;