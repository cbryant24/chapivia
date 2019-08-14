import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import cleanElement from 'clean-element';
import { ALL } from './utils/constants';
import { addStyles, filterProps, addPseudo } from './utils'

import { animationRule } from '../elements/animations'

const Base = props => {

  const Div = styled.div``;
  const next = filterProps(props);

  return <Div {...next} />;
}

export const ExtendedBox = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  
  // props => {
  //   if (!props.pseudo) return;
  //   // const val = addPseudo(props)
  //   const valKeyframes = keyframes`
  //     0% { opacity: 0;}
  //     100% { opacity: 1;}
  //   `
  //   const newVal = css`${valKeyframes} 5s`
  //   debugger
  //   return {animation: newVal}
  // },
  props => addStyles(props),
  ALL
)

// const animation = keyframes`
//   0% {
//     opacity: 0;
//   }

//   100% {
//     opacity: 1;
//   }
// `

// // const animationRule = css`${animation} 1s infinite alternate`
// const animationRule = css`${animation}`

const aniObj = {
  'animation-name': () => animationRule,
  'animation-duration': '1s',
  'animation-iteration-count': 'infinite',
  'animation-timing-function': 'ease',
  'animation-direction': 'alternate',
  'animation-delay': '0s',
  'animation-fill-mode': 'none',
  'animation-play-state': 'running'
}

export const ExtendedTestBox = styled(cleanElement(Base))`
//POSSIBLY try cloning the props into it
  ${addPseudo}
  // ${aniObj}
  // animation-name: ${() => { return animationRule}};
  // animation-duration: 1s;
  // animation-iteration-count: infinite;
  // animation-timing-function: ease;
  // animation-direction: alternate;
  // animation-delay: 0s;
  // animation-fill-mode: none;
  // animation-play-state: running;
  // animation: ${animationRule};
`

export const ExtendedFlex = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    display: 'flex'
  },
  props => addStyles(props),
  ALL
)

export const ExtendedFlexItem = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

export const ExtendedGrid = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    display: 'grid'
  },
  props => addStyles(props),
  ALL
)

export const ExtendedGridItem = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

export const ExtendedText = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

// export const ExtendedInput = styled(Input)`
//   ${props => addStyles(props)}
// `;

export const ExtendedButton = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)