import Box from './Box';
import { alignSelf, justifySelf, letterSpacing} from 'styled-system';
import theme from './theme';
import styled, { keyframes } from 'styled-components';

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

const FlexItem = styled(Box)`
  animation: ${props => props.animation ? `${generateRandomClipFrames(keyframes, 200)} ${props.animation}` : ''};
  filter: ${props => props.filter ? props.filter : ''};
  ${alignSelf} ${justifySelf} ${letterSpacing}
`
FlexItem.displayName = 'FlexItem';
FlexItem.defaultProps = {
  theme
}

export default FlexItem;