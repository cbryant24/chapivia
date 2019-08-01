import { system } from 'styled-system';
import { cssProperties } from './cssHelpers';


export const addStyles = props => {
  const cssProps = {};
  for (let key in props) {
    if(cssProperties[key]) cssProps[key] = true;
  }
  return system({ ...cssProps });
};