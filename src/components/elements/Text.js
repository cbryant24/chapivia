import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  fontSize,
  fontWeight,
  textAlign,
  space,
  color,
  responsiveStyle,
  propTypes,
} from 'styled-system'
import cleanElement from 'clean-element';
import theme, { filterProps, textTransform } from './theme'

export const caps = props =>
  props.caps ? { textTransform: 'uppercase' } : null

export const regular = props =>
  props.regular ? { fontWeight: props.theme.regular } : null

export const bold = props =>
  props.bold ? { fontWeight: props.theme.bold } : null

const Base = props => {
  const next = filterProps(props)
  return <p {...next} />
}

const Text = styled(cleanElement(Base))(
  [],
  fontSize,
  space,
  color,
  caps,
  textAlign,
  bold,
  regular,
  fontWeight,
  textTransform
)

Text.displayName = 'Text'

Text.propTypes = {
  caps: PropTypes.bool,
  regular: PropTypes.bool,
  bold: PropTypes.bool,
  ...propTypes.fontSize,
  ...propTypes.fontWeight,
  ...propTypes.textAlign,
  ...propTypes.space,
  ...propTypes.color
}

Text.defaultProps = {
  theme,
  m: 0
}

Text.span = Text.withComponent('span');
Text.p = Text.withComponent('p');
Text.s = Text.withComponent('s');
Text.hOne = Text.withComponent('h1').extend`
  font-size: "2.2rem"
`;

export default Text;