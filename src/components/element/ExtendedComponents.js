import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import cleanElement from 'clean-element';
import { ALL } from './utils/constants';
import { addStyles, filterProps, addPseudo } from './utils'

// import { animationRule } from '../elements/animations'

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

const animationRule = css`${animation} 1s infinite alternate`
// const animationRule = css`${animation}`

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
      if (props.pseudo) {
        const val = addPseudo(props)();
        // debugger
        // debugger
        // const keys = val['::before'].animation.continuous.trim()
        // const anim = keyframes`${keys}`
        // const before = val['::before']
        // const anime = css`${anim} 1s infinite`
        
        // val['::before'] = { ...before, animation: css`${animationRule}`}
        // // debugger
        // return css`
        //   ::before {
        //     content: ${val['::before'].content};
        //     clip: ${val['::before'].clip};
        //     color: ${val['::before'].color};
        //     font-size: ${val['::before'].fontSize}px;
        //     overflow: ${val['::before'].overflow};
        //     text-shadow: ${val['::before'].textShadow};
        //     animation: ${val['::before'].animation};

        //     @media screen and (min-width: 40em) {
        //       font-size: 24px;
        //     }
        //   }
        // `

        // val['::before'].animation = css`${anim} 1s infinite`
        // const obj = {
        //   '::before': {
        //     content: 'hello world',
        //     color: 'white'
        //   }
        // }
        // const what = 'hello max'
        // `::before { content: "${what}"}`
        // debugger
        
        return val
      }
    }
  }
  

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