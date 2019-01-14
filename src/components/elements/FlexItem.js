import Box from './Box';
import { alignSelf, justifySelf, letterSpacing} from 'styled-system';
import theme from './theme';
import { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


const FlexItem = Box.extend`
  filter: ${props => props.filter ? props.filter : ''};
  animation: ${props => props.animation ? `${rotate} 2s linear infinite` : ''}
  ${alignSelf} ${justifySelf} ${letterSpacing}
`
FlexItem.displayName = 'FlexItem';
FlexItem.defaultProps = {
  theme
}

export default FlexItem;