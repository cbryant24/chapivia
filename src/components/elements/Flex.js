import {
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  flex,
  // flexGrow,
  propTypes
} from 'styled-system';
import Box from './Box';
import Input from './Input';
import PropTypes from 'prop-types';
import { flexGrow } from './theme';
import { keyframes } from 'styled-components';

const wrap = props => (props.wrap ? { flexWrap: 'wrap' } : null);
const bgAnimation = keyframes`
  0% { opacity: 0.9; }
  50% { opacity: 1; }
`

const bgAnimationGlow = keyframes`
  0% { opacity: 0.15; }
  50% { opacity: 0.25; }
  75% { opacity: 0.18; }
  100% { opacity: .28; }
`

const Flex = Box.extend`
  display: flex;
  ${props => props.windowBorder ? `
    border-radius: 2rem;
    border: 1rem solid;
    border-bottom-color: #121212;
    border-left-color: #080808;
    border-right-color: #080808;
    border-top-color: #020202;
  ` : ''}
  animation: ${props => props.bgAnimation ? `${bgAnimation} 10s infinite`: ''};
  animation: ${props => props.bgAnimationGlow ? `${bgAnimationGlow} 60s infinite ease`: ''};
  ${alignSelf} ${alignItems} ${justifyContent} ${wrap} ${flexDirection} ${flex} ${flexGrow};
`;

export const FlexInput = Flex.extend`
  appearance: none;
  vertical-align: middle;
  width: ${props => props.width || props.theme.inputWidth };
  max-width: ${props => props.maxWidth || props.theme.inputMaxWidth };
  line-height: inherit;
  font-family: inherit;
  background-color: transparent;
  border-radius: ${props => props.borderRadius || props.theme.radius };
  border-width: ${props => props.borderWidth || "1px"};
  border-style: solid;
  border-color: ${props => props.borderColor || props.theme.colors.smoke};
  transition: ${props => props.theme.transition} box-shadow;
  ::placeholder {
    color: ${props => props.theme.colors.grey};
  }
  ::-ms-clear {
    display: none;
  }
  &:focus {
    outline: none;
    border-color: ${props => props.focusColor || props.theme.colors.info};
    box-shadow: 0 0 0 1px ${props => props.foucsBoxShadowColor || props.theme.colors.blue[2]};
  }
`

Flex.propTypes = {
  wrap: PropTypes.bool,
  ...propTypes.alignSelf,
  ...propTypes.alignItems,
  ...propTypes.justifyContent,
  ...propTypes.flexDirection,
  ...propTypes.flex
};

Flex.displayName = 'Flex';

export default Flex;