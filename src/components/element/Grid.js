import styled from "styled-components";
import React from 'react';
import { grid, system } from 'styled-system';
import Box from './Box';

const Grid = styled(Box)`
  display: grid;
  ${Grid}
  ${system({
    'grid-row-start': true,
    'grid-column-start': true,
    'grid-row-end': true,
    'grid-column-end': true,
    'itemname': true,    
  })}
`

Grid.defaultProps = {
  // theme,
  templateColumns: "auto",
  templateRows: "auto"
}

Grid.displayName = 'Grid';

export default Grid;
