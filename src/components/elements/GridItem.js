import React from 'react';
import FlexItem from './Flex';
import theme from './theme';


const GridItem = FlexItem.extend`
  grid-row: ${ props => props.gridRow};
  grid-column: ${ props => props.gridColumn};
`

GridItem.defaultProps = {
  theme,
  gridRow: "auto",
  gridColumn: "auto"
}

GridItem.displayName = 'GridItem';

export default GridItem;