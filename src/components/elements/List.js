import Box from './Box';
import { 
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  flex } from 'styled-system';

const List = Box.withComponent('ul').extend`
  display: block;
  ${alignSelf} ${alignItems} ${justifyContent} ${flex} ${flexDirection};
`

List.displayName = 'List';

export default List;