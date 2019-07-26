import React from 'react'
import styled from 'styled-components'
import {  typography,
          background,
          layout,
          space, 
          color,
          border } from 'styled-system'
import cleanElement from 'clean-element';
import theme from './theme'
import PropTypes from 'prop-types'
import { filterProps, appearance, transition, outline } from './css-helpers';
// import Base from './Base';

const chevron = () => {
  const props = `xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'`
  const slate = '%23' + theme.colors.slate.replace('#', '')
  const pathProps = `fill='${slate}' d='M2 0L0 2h4zm0 5L0 3h4z'`
  return `%3Csvg ${props}%3E%3Cpath ${pathProps}/%3E%3C/svg%3E`
}

const Base = (props) => {
  //creates a clean component with all css property attributes passed 
  //as props which are non-valid html attributes removed from the element.
  //`as` property is used with the `forwaredAs` to pass the element type
  //`forwaredAs` is used instead of `as` due to being wrapped in `cleanElement` HOC
  const { as }  = props;
  const next    = filterProps(props);
  const Component = styled.div``;
  return <Component as={as} {...next} />
}

const Input = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  layout, appearance, space, typography, transition, outline, border, color, background, 
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