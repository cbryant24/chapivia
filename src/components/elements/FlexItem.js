import Box from './Box';
import { alignSelf, justifySelf, letterSpacing} from 'styled-system';
import theme from './theme';
import { keyframes } from 'styled-components';

function generateRandomClipFrames(keyframes, len){
  let keyframe = ``;
  let size = 100;
  for(var i = 0; i < len; i++){
    keyframe += 
      `${(i / len) * 100}%{
    clip-path: inset(${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}%)
    }`
  }

  return keyframes`${keyframe}`;
}

const FlexItem = Box.extend`
  filter: ${props => props.filter ? props.filter : ''};
  animation: ${props => props.animation ? `${generateRandomClipFrames(keyframes, 200)} ${props.animation}` : ''}
  ${alignSelf} ${justifySelf} ${letterSpacing}
`
FlexItem.displayName = 'FlexItem';
FlexItem.defaultProps = {
  theme
}

export default FlexItem;