import { system } from 'styled-system';
import { cssProperties, pseudoClasses, pseudoElements } from './cssHelpers';

import css from '@styled-system/css';


export const addStyles = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

export const addPseudo = props => {
  if (!props.pseudo) return;

  const elementProps = Object.getOwnPropertyNames(props);
  const pseudoClassProps = elementProps.filter( prop => pseudoClasses.includes(prop));
  const pseudoElementProps = elementProps.filter( prop => pseudoElements.includes(prop));

  if (!pseudoClassProps && !pseudoElementProps) return;

  const pseudo = {};
  pseudoClassProps.forEach( pseudoType => pseudo[`:${pseudoType}`] = props[pseudoType] );
  pseudoElementProps.forEach( pseudoType => pseudo[`::${pseudoType}`] = props[pseudoType]);

  // debugger
  if (pseudoElementProps.indexOf('firstLine') >= 0)
    pseudo['::first-line'] = pseudo['::firstLine'];

  if (pseudoElementProps.indexOf('firstLetter') >= 0)
    pseudo['::first-letter'] = pseudo['::firstLetter'];
    // debugger
  if (pseudoElementProps.indexOf('before') >= 0)
    pseudo['::before'].content = `\'${pseudo['::before'].content}\'`;

  if (pseudoElementProps.indexOf('after') >= 0)
    pseudo['::after'].content = `\'${pseudo['::after'].content}\'`;
    
  // debugger
  return css({ ...pseudo });
}

export const getStyles = props => {
  const styleProps = {};

}