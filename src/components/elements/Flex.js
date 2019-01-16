import {
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  flex,
  // height,
  propTypes
} from 'styled-system';
import Box from './Box';
import PropTypes from 'prop-types';
import { keyframes } from 'styled-components';

const wrap = props => (props.wrap ? { flexWrap: 'wrap' } : null);
const bgAnimation = keyframes`
  0% { opacity: 0.9; }
  50% { opacity: 1; }
`

const bgAnimationGlow = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 0.2; }
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
  animation: ${props => props.bgAnimationGlow ? `${bgAnimationGlow} 60s infinite`: ''};
  ${alignSelf} ${alignItems} ${justifyContent} ${wrap} ${flexDirection} ${flex};
`;

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