import styled from "styled-components";
import React from 'react';
import { grid, system } from 'styled-system';
import Box from './Box';

const Grid = styled(Box)`
  display: grid;
  ${Grid}
`

Grid.displayName = 'Grid';

export default Grid;
