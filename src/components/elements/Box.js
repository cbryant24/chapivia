import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  space,
  width,
  color,
  border,
  fontSize,
  fontFamily,
  textAlign,
  responsiveStyle,
  height,
  display,
  position,
  zIndex,
  propTypes
} from 'styled-system';
import { fontStyle } from './theme'
import theme, { filterProps } from './theme'
import { clipPath } from './theme';
import cleanElement from 'clean-element'


const Base = props => {
  const next = filterProps(props)
  return <div {...next} />
}

const Box = styled(cleanElement(Base))([], space, width, color, fontSize, textAlign, height, border, display, position, zIndex, fontFamily, fontStyle, clipPath);

Box.displayName = 'Box'
Box.header = Box.withComponent('header')
Box.main = Box.withComponent('main')
Box.article = Box.withComponent('article')
Box.section = Box.withComponent('section')
Box.footer = Box.withComponent('footer')

Box.defaultProps = {
  theme
}

Box.propTypes = {
  ...propTypes.textAlign,
  ...propTypes.fontSize,
  ...propTypes.space,
  ...propTypes.color
}

export default Box