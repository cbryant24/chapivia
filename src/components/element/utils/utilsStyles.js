import { system } from 'styled-system';
import { cssProperties, psuedoClasses } from './cssHelpers';


export const addStyles = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};

export const addPsuedo = props => {
  const psuedoDynamicClass = ['lang', 'nth-of-type', 'nth-last-of-type', 'nth-last-child', 'lang', 'not']
  //debugger
  let { psuedoClass: { type, additionalSelector, referBack, custom , ...rest}} = props;

  validPsuedoClass(props.psuedo);

  if(checkForDynamicPsuedoClass(type)) {
    type = `${type}(${additionalSelector})`
  } else if(additionalSelector) {
    type = `${type} ${additionalSelector}`
  }

  const psuedoStyle = `
    ${referBack ? '&':''}:${type} {
      ${rest}
    }
  `;

  return psuedoStyle;

  function validPsuedoClass(psuedoClass) {
    if(!psuedoClass) return;

    if (psuedoClasses.includes(props.type)) {
      if (checkForDynamicPsuedoClass(props.type)) {
        if (!props.additionalSelector) throw new TypeError(
          `${props.type} needs a selector pass value with additionalType`
        );
      
        if (props.type === 'lang') {
          if (typeof props.additionalSelector === 'string') throw new TypeError(
            `${props.additionalSelector} is not a valid CSS selector at additionalSelector object lang must be type string`
          );
        }
      }
    } else {
      throw new TypeError(
        `${props.type} a valid pseudo classes need a valid type please select an appropriate psuedo class`
      )
    }
  }

  function checkForDynamicPsuedoClass(psuedoClassType) {
    return psuedoDynamicClass.includes(psuedoClassType);
  }
}

export const getStyles = props => {
  const styleProps = {};

}