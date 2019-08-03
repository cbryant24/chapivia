import React from 'react';
import { filterProps } from './filterProps';

export const addProps = (component, props) => {
  if (!component || !props) return;

  if (Array.isArray(component)) {
    if(Array.isArray(props)) {
      const newComponentsArr = component.map( (component, idx) => {
        return React.cloneElement( component, { ...props[idx]})
      })

      return newComponentsArr;
    }
    const newComponents = component.map( component => {
      return React.cloneElement( component, { ...props });
    })
    return newComponents;
  }

  const newComponent = React.cloneElement(component, { ...props })

  return newComponent;
}