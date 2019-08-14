import { system } from 'styled-system';
import { cssProperties, pseudoClasses, pseudoElements } from './cssHelpers';
import { validateAnimation } from './cssValidators';

import styledCSS from '@styled-system/css';

import { keyframes, css } from 'styled-components'

export const addStyles = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

export const addPseudo = props => {
  if (!props.pseudo) return;

  let pseudoAnimations = null;
  const elementProps = Object.getOwnPropertyNames(props);
  const pseudoClassProps = elementProps.filter( prop => pseudoClasses.includes(prop));
  const pseudoElementProps = elementProps.filter( prop => pseudoElements.includes(prop));

  if (!pseudoClassProps && !pseudoElementProps) return;

  const pseudo = {};
  pseudoClassProps.forEach( pseudoType => pseudo[`:${pseudoType}`] = props[pseudoType] );
  pseudoElementProps.forEach( pseudoType => pseudo[`::${pseudoType}`] = props[pseudoType]);

  if (pseudoElementProps.indexOf('firstLine') >= 0)
    pseudo['::first-line'] = pseudo['::firstLine'];

  if (pseudoElementProps.indexOf('firstLetter') >= 0)
    pseudo['::first-letter'] = pseudo['::firstLetter'];

  if (pseudoElementProps.indexOf('before') >= 0) {
    pseudo['::before'].content = `\'${pseudo['::before'].content}\'`;

    if(pseudo['::before'].animation) {
      validateAnimation(pseudo['::before'].animation);
      const { animation } = pseudo['::before'];
      // debugger
      // const animationName = animation.in || animation.continuous || animation.out;
      // const animationDuration = animation.duration_continous || animation.duration_out;

      const animationRule = css`${animation.continuous}`
      // pseudoAnimations = {
      //   'animation-name': () => animationRule,
      //   'animation-duration': animation.duration_continuous,
      //   'animation-iteration-count': 'infinite',
      //   'animation-timing-function': 'ease',
      //   'animation-direction': animation.animation_direction,
      //   'animation-delay': '0s',
      //   'animation-fill-mode': animation.animation_fill_mode,
      //   'animation-play-state': 'running'
      // }
      // debugger
      pseudo['::before']['animation-name']= () => animationRule;
      pseudo['::before']['animation-duration'] = animation.duration_continuous;
      pseudo['::before']['animation-iteration-count'] = 'infinite';
      pseudo['::before']['animation-timing-function'] = 'ease';
      pseudo['::before']['animation-direction'] = animation.animation_direction;
      pseudo['::before']['animation-delay'] = '0s';
      pseudo['::before']['animation-fill-mode'] = animation.animation_fill_mode;
      pseudo['::before']['animation-play-state'] = 'running'
    }
    // debugger
    // pseudoAnimations.keyFrames = keyframes`
    //     0% { opacity: 0}
    //     100% { opacity: 1 }
    //   `

      // const callAni = () => css`${ani} 1s`
      // pseudo['::before'].animation = callAni;
    // pseudo['::before']['animation-name'] = ani;
    // pseudo['::before']['animation-duration'] = '5s';
    // debugger
  }
    

  if (pseudoElementProps.indexOf('after') >= 0)
    pseudo['::after'].content = `\'${pseudo['::after'].content}\'`;
    
  // debugger

  // const buildPseudoAnimation = animation => {

  //   const get
  // }
  const val = styledCSS({ ...pseudo });
  
  // debugger
  return val
}

export const getStyles = props => {
  const styleProps = {};
}