import React from 'react'
import styled from 'styled-components'
import {  typography, 
          space, 
          color,
          border } from 'styled-system'
import cleanElement from 'clean-element';
import theme from './theme'
import PropTypes from 'prop-types'
import { appearance, verticalAlign, transition, outline } from './css-helpers';
import { filterProps } from './utils/index'

const chevron = () => {
  const props = `xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'`
  const slate = '%23' + theme.colors.slate.replace('#', '')
  const pathProps = `fill='${slate}' d='M2 0L0 2h4zm0 5L0 3h4z'`
  return `%3Csvg ${props}%3E%3Cpath ${pathProps}/%3E%3C/svg%3E`
}

const Base = (props) => {
  debugger
  const next = filterProps(props);
  return <input {...next} />
}

const Input = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  appearance, space, typography, verticalAlign, transition, outline, border, color
);

// Input.displayName = 'Input'

// Input.propTypes = {
//   id: PropTypes.string,
//   // ...propTypes.fontSize,
//   // ...propTypes.space,
//   // ...propTypes.width,
//   // ...propTypes.color
// }

// Input.defaultProps = {
//   theme,
//   w: 1,
//   m: 0,
//   // fontSize: `${theme.remSizes[16]}rem`,
//   color: 'inherit',
//   bg: 'transparent'
// };

export default Input;