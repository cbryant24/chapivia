import React from 'react'
import styled from 'styled-components'
import {  typography,
          background,
          layout,
          space, 
          color,
          border } from 'styled-system'
import cleanElement from 'clean-element';
import PropTypes from 'prop-types'
import { appearance, verticalAlign, transition, outline } from './utils/cssHelpers';
import { filterProps } from './utils/'

// const chevron = () => {
//   const props = `xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'`
//   const slate = '%23' + theme.colors.slate.replace('#', '')
//   const pathProps = `fill='${slate}' d='M2 0L0 2h4zm0 5L0 3h4z'`
//   return `%3Csvg ${props}%3E%3Cpath ${pathProps}/%3E%3C/svg%3E`
// }

const Base = (props) => {
  //creates a clean component with all css property attributes passed 
  //as props which are non-valid html attributes removed from the element.
  const next      = filterProps(props);
  // if ()
  const Component = styled.div``;
  return <Component {...next} />
}

const Input = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  layout, appearance, space, typography, transition, outline, border, color, background, 
);

Input.displayName = 'Input'


export default Input;