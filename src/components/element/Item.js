import styled from "styled-components";
import Text from './Text';
import { 
  alignSelf,
  justifySelf } from 'styled-system';

const Item = styled(Text.withComponent('li'))`
  ${alignSelf} ${justifySelf};
`

Item.displayName = 'Item';

export default Item;