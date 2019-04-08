import Button from './Button'
import { maxHeight } from 'styled-system';
import theme, { cx } from './theme';
import { outlineButton } from './ButtonCSS';

const OutlineButton = Button.extend`
  ${outlineButton}
`

OutlineButton.displayName = 'OutlineButton'

OutlineButton.defaultProps = {
  theme,
}

export default OutlineButton