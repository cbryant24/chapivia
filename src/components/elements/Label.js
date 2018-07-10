import Text from './Text'
import { width, propTypes } from 'styled-system'
import theme from './theme'

const Label = Text.withComponent('label').extend`
  display: block;
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: underline;
  }
`

Label.displayName = 'Label'

Label.propTypes = {
  ...propTypes.width
}

Label.defaultProps = {
  theme,
  color: 'white',
  f: 2,
  w: 1
}

export default Label