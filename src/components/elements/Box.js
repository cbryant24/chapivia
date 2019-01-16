import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  space,
  width,
  color,
  border,
  boxShadow,
  fontSize,
  fontFamily,
  textAlign,
  background,
  opacity,
  backgroundSize,
  borderRadius,
  responsiveStyle,
  height,
  display,
  position,
  top,
  bottom,
  left,
  right,
  zIndex,
  propTypes
} from 'styled-system';
import { fontStyle, backgroundColor } from './theme'
import theme, { filterProps } from './theme'
import { clipPath } from './theme';
import cleanElement from 'clean-element'
import { backgroundImage, fontSmooth, textShadow, transformOrigin, transform, content } from './theme';

const Base = props => {
  const next = filterProps(props)
  return <div {...next} />
}

const Box = styled(cleanElement(Base))([], space, width, color, fontSize, textAlign, height, border, display, position, zIndex, fontFamily, fontStyle, clipPath, top,
  bottom,
  left,
  right,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  fontSmooth,
  borderRadius,
  boxShadow,
  textShadow,
  background,
  opacity,
  transform,
  transformOrigin,
  content);

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