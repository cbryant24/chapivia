import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import {
  fontSize,
  fontWeight,
  fontStyle,
  textAlign,
  space,
  color,
  position,
  responsiveStyle,
  top,
  bottom,
  left,
  right,
  propTypes,
} from 'styled-system'
import { clipPath } from './theme';
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
  fontStyle,
  clipPath,
  space,
  color,
  caps,
  textAlign,
  bold,
  regular,
  fontWeight,
  textTransform,
  position,
  top,
  bottom,
  left,
  right
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
};

Math.Ran = function(max){
  let rn = Math.round(Math.random() * max);
  rn *= Math.random() > 0.5 ? -1 : 1;
  return rn
};

function generateRandomKeyFrames(keyframes, dis, len, name){
  let keyframe = ``;
  for(var i = 0; i < len; i++){
    keyframe += `${(i / len) * 100}%{transform: translateX(${Math.Ran(dis)}px)}`
  }
  debugger
  // let style = document.createElement('style');
  // style.innerHTML = `@keyframes ${name} { ${keyframes} }`;
  
  // document.body.appendChild(style);

  return keyframes`${keyframe}`
}

function generateRandomClipFrames(dis, len, name){
  let keyframe = ``;
  let size = 100;
  for(var i = 0; i < len; i++){
    keyframe += 
      `${(i / len) * 100}%{
    clip-path: inset(${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}% ${Math.Ran(size)}%)
    }`
  }

  return keyframes`${keyframe}`;

  debugger
  // let style = document.createElement('style');
  // style.innerHTML = `@keyframes ${name} {
  //   ${keyframes} 
  // }`;

  // document.body.appendChild(style);

}


// generateRandomKeyFrames(10, 10, "random2");
// generateRandomClipFrames(200, "random-clip-1")

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `;

Text.span = Text.withComponent('span');
Text.p = Text.withComponent('p').extend`
  animation: ${props => props.animation_one ? `${generateRandomKeyFrames(keyframes, 15, 16, "random1")} ${props.animation_one};` : ''};
  animation: ${props => props.animation_two ? `${generateRandomKeyFrames(keyframes, 10, 10, "random1")} ${props.animation_two};` : ''}

`
Text.s = Text.withComponent('s');
Text.hOne = Text.withComponent('h1').extend`
  font-size: "2.2rem"
`;

export default Text;