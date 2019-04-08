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
  minHeight,
  textAlign,
  background,
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
  flexDirection,
  propTypes,
  minWidth
} from 'styled-system';
import { fontStyle, backgroundColor } from './theme'
import theme, { filterProps } from './theme'
import { clipPath } from './theme';
import cleanElement from 'clean-element'
import { backgroundImage, fontSmooth, textShadow, transformOrigin, transform, content, opacity } from './theme';

const Base = props => {
  const next = filterProps(props)
  return <div {...next} />
}

const Box = styled(cleanElement(Base))([], 
    space, width, color, fontSize, textAlign, height, border, display, position, zIndex, fontFamily, fontStyle, clipPath, top,
    bottom, left, right, backgroundColor, backgroundImage, backgroundSize, fontSmooth, borderRadius, boxShadow, textShadow,
    background, opacity, transform, transformOrigin, content, flexDirection, minHeight, minWidth
  );

Box.displayName = 'Box'
Box.header = Box.withComponent('header')
Box.main = Box.withComponent('main')
Box.article = Box.withComponent('article')
Box.section = Box.withComponent('section')
Box.footer = Box.withComponent('footer')
Box.span = Box.withComponent('span');

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