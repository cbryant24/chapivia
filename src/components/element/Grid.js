import styled from "styled-components";
import React from 'react';
import { 
  alignSelf,
  alignItems,
  justifyContent,
  alignContent,
  // propTypes
} from 'styled-system';
import Box from './Box';
import theme from './theme';

const Grid = styled(Box)`
  display: grid;
  grid-template-rows: ${props => props.templateRows};
  grid-template-columns: ${props => props.templateColumns};
  grid-gap: ${props => props.gridGap};
  grid-row-gap: ${props => props.gridRowGap};
  grid-column-gap: ${props => props.gridColumnGap};
  ${alignSelf} ${alignItems} ${alignContent} ${justifyContent};
`

Grid.defaultProps = {
  theme,
  templateColumns: "auto",
  templateRows: "auto"
}

Grid.propTypes = {
  // ...propTypes.alignSelf,
  // ...propTypes.alignItems,
  // ...propTypes.justifyContent,
};

Grid.displayName = 'Grid';

export default Grid;

// "[row-start] 1fr [first-row-end second-row-start] 
//                         1fr [second-row-end third-row-start] 
//                         1fr [last-row-end]"