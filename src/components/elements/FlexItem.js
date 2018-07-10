import Box from './Box';
import { alignSelf, justifySelf } from 'styled-system';
import theme from './theme';

const FlexItem = Box.extend`
  ${alignSelf} ${justifySelf}
`
FlexItem.displayName = 'FlexItem';
FlexItem.defaultProps = {
  theme
}

export default FlexItem;