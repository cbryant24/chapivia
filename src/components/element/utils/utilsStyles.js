import { system } from 'styled-system';
import { cssProperties, pseudoClasses } from './cssHelpers';

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

  const pseudoProps = Object.getOwnPropertyNames(props).filter( prop => pseudoClasses.includes(prop));

  if (!pseudoProps) return;

  const pseudoElements = {}
  pseudoProps.forEach( pseudoType => pseudoElements[`:${pseudoType}`] = props[pseudoType] );

  debugger
  return css({ ...pseudoElements })

  // let { psuedoClass: { type, additionalSelector, referBack, custom , ...rest}} = props;

  // validPsuedoClass(props.psuedo);

  // if(checkForDynamicPsuedoClass(type)) {
  //   type = `${type}(${additionalSelector})`
  // } else if(additionalSelector) {
  //   type = `${type} ${additionalSelector}`
  // }

  // const psuedoStyle = {
    
  // };
  
  // return psuedoStyle;

  // function validPsuedoClass(psuedoClass) {
  //   if(!psuedoClass) return;

  //   if (psuedoClasses.includes(props.type)) {
  //     if (checkForDynamicPsuedoClass(props.type)) {
  //       if (!props.additionalSelector) throw new TypeError(
  //         `${props.type} needs a selector pass value with additionalType`
  //       );
      
  //       if (props.type === 'lang') {
  //         if (typeof props.additionalSelector === 'string') throw new TypeError(
  //           `${props.additionalSelector} is not a valid CSS selector at additionalSelector object lang must be type string`
  //         );
  //       }
  //     }
  //   } else {
  //     throw new TypeError(
  //       `${props.type} a valid pseudo classes need a valid type please select an appropriate psuedo class`
  //     )
  //   }
  // }

  // function checkForDynamicPsuedoClass(psuedoClassType) {
  //   return psuedoDynamicClass.includes(psuedoClassType);
  // }
}

export const getStyles = props => {
  const styleProps = {};

}