import Box from './Box'
import PropTypes from 'prop-types';
import theme from './theme';

const Image = Box.withComponent('img').extend`
  max-width: 100%;
  border-radius: ${props => props.theme.radius && props.borderRadius};
`

Image.displayName = 'Image'

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

Image.defaultProps = {
  theme,
  height: "auto"
}

export default Image