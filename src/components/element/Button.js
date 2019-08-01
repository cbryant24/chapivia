import styled from 'styled-components';
import PropTypes from 'prop-types';
import Box from './Box';
import { BORDER, TYPOGRAPHY, CURSOR } from './utils';
import theme, { cx, hexa } from './theme';

const Button = styled(Box)`
  ${BORDER} ${TYPOGRAPHY} ${CURSOR}
`

Button.displayName = 'Button';

Button.defaultProps = {
  theme,
  bg: 'primary',
  color: 'white',
  f: 3,
  m: 0,
  px: 3,
  py: 2
};

export default Button;