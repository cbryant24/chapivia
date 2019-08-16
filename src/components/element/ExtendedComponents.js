import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import cleanElement from 'clean-element';
import { ALL } from './utils/constants';
import { addStyles, filterProps, addPseudo } from './utils'
import { getAnimation } from './animations';

// import { animationRule } from '../elements/animations'

import styledCSS from '@styled-system/css';


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

const animation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

// const animationRule = css`${animation} 1s infinite alternate`
const animationRule = css`${animation}`

// const aniObj = {
//   'animation-name': () => animationRule,
//   'animation-duration': '1s',
//   'animation-iteration-count': 'infinite',
//   'animation-timing-function': 'ease',
//   'animation-direction': 'alternate',
//   'animation-delay': '0s',
//   'animation-fill-mode': 'none',
//   'animation-play-state': 'running'
// }



const before = css`
  ::before {
    content: "Hello World";
    clip: rect(0, 900px,0,0);
    color: "white";
    fontSize: 14px;
    overflow: hidden;
    textShadow: 1px 0 blue;
    animation: ${animationRule};
  }
`


export const ExtendedTestBox = styled(cleanElement(Base))`

  ${props => {
    // debugger
      if (!props.pseudo) return;
      return (styledCSS({
        '&::before': {
          content: JSON.stringify(props.before.content),
          fontSize: props.before.fontSize,
        }
      }));
    }
  }

  ${ props => {
    if (!props.pseudo || !props.before.animation) return;

    const animationProperties = getAnimation(props.before);
    // debugger
    return (
      css`
        :: before {
        animation-name: ${animationProperties.animation};
        animation-duration: ${animationProperties.duration};
        animation-iteration-count: ${animationProperties.iteration};
        animation-timing-function: ${animationProperties.animationTimingFunction};
        animation-direction: ${animationProperties.animationDirection};
        animation-fill-mode: ${animationProperties.animationFillMode};
        animation-play-state: running;
      }`
    );
  }}
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