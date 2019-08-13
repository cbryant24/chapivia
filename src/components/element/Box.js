import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { SPACE, COLOR, LAYOUT, APPEARANCE, FONTSIZESMODULES, ZINDEX } from './utils';
import cleanElement from 'clean-element';
import { filterProps } from './utils';

const Base = props => {

  const Div = styled.div``;
  const next = filterProps(props);

  return <Div {...next} />;
}

//WORKS
// const obj = {
//   maxWidth: '200rem'
// }

//WORKS
// const obj = function() {
//   return {maxWidth: '205rem'}
// }

// WORKS
// const obj = val => ({maxWidth: val});

//WORKS
// const obj = {
//   ':hover': {
//     color: '#551A8B'
//   }
// }

//WORKS
// const obj = {
//   'a:link': {
//     color: '#551A8B'
//   },
//   'a:hover': {
//     color: '#1a8b55'
//   }
// }

//WORKS
// const obj = (props) => {
//   // debugger
//   return (
//     {
//       'a:link': {
//         color: '#551A8B'
//       },
//       'a:hover': {
//         color: '#1a8b56'
//       }
//     }
//   )
// }

//WORKS
// const obj = (props) => {
//   // debugger
//   return (
//     {
//       '&:link': {
//         color: '#551A8B'
//       },
//       '&:hover': {
//         color: '#1a8b56'
//       }
//     }
//   )
// }

//WORKS
const obj = props => {
  // debugger
  return ({
    'h1 p:hover': {
      color: '#1a8b56'
    }
  })
}

const Box = styled(cleanElement(Base))(
  { 
    boxSizing: 'border-box',
    minWidth: 0,
  },
  // obj,
  props => props.psuedo ? obj : '',
  LAYOUT, SPACE, COLOR, APPEARANCE, FONTSIZESMODULES, ZINDEX
);

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;