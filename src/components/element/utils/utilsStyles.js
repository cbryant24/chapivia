import { system } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import styledCSS from '@styled-system/css';

import { cssProperties, pseudoClasses, pseudoElements } from './cssHelpers';



export const addStyles = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

export const addPseudo = props => {
  if (!props.pseudo) return;
  // debugger
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

  const val = styledCSS({ ...pseudo });
  // debugger
  return val;
}

export const addThemeStyle = props => {
  if (props.themeStyle) {

    if (Array.isArray(props.themeStyle)) {
      let combinedStyle = {};

      props.themeStyle.forEach( style => {
        const themeVals = themeGet(style)(props);
        combinedStyle = { ...combinedStyle, ...themeVals }
      });

      return styledCSS(combinedStyle);
    }

    return styledCSS(themeGet(props.themeStyle)(props))
  }
}

export const getStyles = props => {
  const styleProps = {};
}