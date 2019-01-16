import Text from './Text';
import { 
  alignSelf,
  justifySelf } from 'styled-system';

const Item = Text.withComponent('li').extend`
  ${alignSelf} ${justifySelf};
`

Item.displayName = 'Item';

export default Item;