import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  space,
  display,
  width,
  color,
  border,
  fontSize,
  textAlign,
  text,
  responsiveStyle,
  height,
  // propTypes,
} from 'styled-system'
import theme from './theme'
import { filterProps } from './css-helpers'
import cleanElement from 'clean-element'


const Base = props => {
  const next = filterProps(props)
  return <table {...next} />
}

const Table = styled(cleanElement(Base))([], space, width, color, fontSize, 
              textAlign, height, border );

Table.displayName = 'Table'
Table.tr = Table.withComponent('tr')
Table.th = Table.withComponent('th')
Table.td = styled(Table.withComponent('td'))`
  ${display};
`
Table.body = Table.withComponent('tbody')

Table.defaultProps = {
  theme,
}

Table.propTypes = {
  // ...propTypes.textAlign,
  // ...propTypes.fontSize,
  // ...propTypes.space,
  // ...propTypes.color,
}



export default Table