import PropTypes from 'prop-types'
import Box from './Box'
import theme, { cx, hexa } from './theme'
import { button } from './ButtonCSS';
import { css } from 'styled-components'

import {
  fontSize
} from 'styled-system';

const Button = Box.withComponent('a').extend`
  ${ button }
`

Button.displayName = 'Button';

Button.propTypes = {
  /** flip colors */
  inverted: PropTypes.bool,
  /** add hover/focus animation */
  scale: PropTypes.bool,
  /** add left text arrows */
  chevronLeft: PropTypes.bool,
  /** add right text arrows */
  chevronRight: PropTypes.bool
};

Button.defaultProps = {
  theme,
  bg: 'primary',
  color: 'white',
  f: 3,
  m: 0,
  px: 3,
  py: 2
};

Button.button = Button.withComponent('button');
Button.input = Button.withComponent('input');

export default Button;