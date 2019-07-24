import styled from "styled-components";
import Button from './Button'
import { maxHeight } from 'styled-system';
import theme, { cx } from './theme';
import { outlineButton } from './ButtonCSS';

const OutlineButton = styled(Button)`
  ${outlineButton}
`

OutlineButton.displayName = 'OutlineButton'

OutlineButton.defaultProps = {
  theme,
}

export default OutlineButton