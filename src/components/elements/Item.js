import Text from './Text';
import { 
  alignSelf,
  justifySelf } from 'styled-system';

const Item = Text.withComponent('li').extend`
  ${props => props.hover ? 
    `:hover {
        color: #14fdce;
        background-color: #14fdce;
    }` : ''
  }
  ${alignSelf} ${justifySelf};
`

Item.displayName = 'Item';

export default Item;