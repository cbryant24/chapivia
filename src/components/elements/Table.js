import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  space,
  width,
  color,
  border,
  fontSize,
  textAlign,
  text,
  responsiveStyle,
  height,
  propTypes,
} from 'styled-system'
import theme, { filterProps, textTransform } from './theme'
import cleanElement from 'clean-element'


const Base = props => {
  const next = filterProps(props)
  return <table {...next} />
}

const Table = styled(cleanElement(Base))([], space, width, color, fontSize, 
              textAlign, height, border, textTransform );

Table.displayName = 'Table'
Table.tr = Table.withComponent('tr')
Table.th = Table.withComponent('th')
Table.td = Table.withComponent('td')
Table.body = Table.withComponent('tbody')

Table.defaultProps = {
  theme,
}

Table.propTypes = {
  ...propTypes.textAlign,
  ...propTypes.fontSize,
  ...propTypes.space,
  ...propTypes.color,
}



export default Table