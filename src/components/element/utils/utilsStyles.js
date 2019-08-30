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

export const addPseudo = (props, isThemeStyled=false) => {
  if (!props.pseudo) return;
  // debugger
  const elementProps = Object.getOwnPropertyNames(props);
  const pseudoClassProps = elementProps.filter( prop => pseudoClasses.includes(prop));
  const pseudoElementProps = elementProps.filter( prop => pseudoElements.includes(prop));

  if (!pseudoClassProps && !pseudoElementProps) return;

  const pseudo = {};
  pseudoClassProps.forEach( pseudoType => pseudo[`:${pseudoType}`] = props[pseudoType] );
  pseudoElementProps.forEach( pseudoType => pseudo[`::${pseudoType}`] = props[pseudoType]);
  // debugger
  if (pseudoClassProps.indexOf('focusWithin') >= 0)
    pseudo[':focus-within'] = pseudo[':focusWithin'];

  if (pseudoElementProps.indexOf('firstLine') >= 0)
    pseudo['::first-line'] = pseudo['::firstLine'];

  if (pseudoElementProps.indexOf('firstLetter') >= 0)
    pseudo['::first-letter'] = pseudo['::firstLetter'];

  if (isThemeStyled) return pseudo;

  return styledCSS({ ...pseudo });
}

export const addThemeStyle = props => {
  if (!props.themeStyle) return;
    // debugger
  if (Array.isArray(props.themeStyle)) {
    let combinedStyle = {};

    props.themeStyle.forEach( style => {
      const themeVals = themeGet(style)(props);
      combinedStyle = { ...combinedStyle, ...themeVals }
    });
    // debugger
    if (combinedStyle.pseudo) {
      combinedStyle = {...combinedStyle, ...addPseudo(combinedStyle, true)}
      //debugger
    }
    return styledCSS(combinedStyle);
  }

  let themedStyles = themeGet(props.themeStyle)(props);
  // debugger
  if (themedStyles.pseudo) 
    themedStyles = {...themedStyles, ...addPseudo(themedStyles, true)}
    //debugger
  // debugger
  if (props.remove)
    themedStyles = removeStyles(themedStyles, props.remove)

  return styledCSS(themedStyles)
}

//CONTINUE HERE: add another property for string/array and removal of styles to object version if remove is not null
export const styleBuildRemove = (styles, remove) => {
  return (
    typeof styles === 'string' || Array.isArray(styles) ? { themeStyle: styles, remove } : 
                                                  remove ? removeStyles(styles, remove) : { ...styles  }
  )
}

export const removeStyles = (styles, remove) => {
  let removedStyles = styles;

  if (Array.isArray(remove)) {
    remove.forEach( (style, idx) => {
      const { [style]: removed, ...rest} = removedStyles;
      removedStyles = rest;
    })

    return  removedStyles;
  }
  const { [remove]: removed, ...rest } = styles;
  removedStyles = rest;

  return removedStyles
}
