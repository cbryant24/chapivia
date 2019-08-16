import { system } from 'styled-system';
import { cssProperties, pseudoClasses, pseudoElements } from './cssHelpers';
import { validateAnimation } from './cssValidators';

import styledCSS from '@styled-system/css';
import { getAnimation } from '../animations'

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
  debugger
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
    pseudo['::before'].content = `\'${pseudo['::before'].content.replace(/['"]+/g, '')}\'`;

    if(pseudo['::before'].animation) {
      // debugger
      // switch
      const { animation } = pseudo['::before'];

      validateAnimation(pseudo['::before'].animation);
      // debugger
      const currentAnimation = getAnimation(pseudo['::before']);

      if (currentAnimation.animation) {
        pseudo['::before'].animation = {...currentAnimation}
        // debugger
      } else {
        // for (let key in animation) {
        //   switch(key) {
        //     case 'continuous':
        //     // case 'in':
        //     // case 'out':
        //       pseudo['::before'].animation[key] = () => pseudo['::before'].animation[key]
        //   }
        // }
      }
    }
  }
    

  if (pseudoElementProps.indexOf('after') >= 0)
    pseudo['::after'].content = `\'${pseudo['::after'].content.replace(/['"]+/g, '')}\'`;
    
  // debugger


  // const buildPseudoAnimation = animation => {

  //   const get
  // }
  // debugger
  const val = styledCSS({ ...pseudo });
  // debugger
  return pseudo;
}

export const getStyles = props => {
  const styleProps = {};
}