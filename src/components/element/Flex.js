import { flex, system } from 'styled-system';
import Box from './Box';
import styled from 'styled-components';
import is from 'styled-is';

const Flex = styled(Box)`
  display: flex;
  ${flex}
  ${system({
    'flex-flow': true
  })}
`;

// export const FlexInput = styled(Flex)`
  /* display: flex;
  flex */

  /* appearance: none;
  vertical-align: middle;
  width: ${props => props.width || props.theme.inputWidth};
  max-width: ${props => props.maxWidth || props.theme.inputMaxWidth};
  line-height: inherit;
  font-family: inherit;
  background-color: transparent;
  border-radius: ${props => props.borderRadius || props.theme.radius};
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
  } */
// `

// Flex.propTypes = {
//   wrap: PropTypes.bool,
//   // ...propTypes.alignSelf,
//   // ...propTypes.alignItems,
//   // ...propTypes.justifyContent,
//   // ...propTypes.flexDirection,
//   // ...propTypes.flex
// };

// Flex.displayName = 'Flex';

export default Flex;