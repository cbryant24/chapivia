import React from 'react';
import cleanElement from 'clean-element';
import { filterProps } from './css-helpers'

const Base = props => {
  // debugger
  const next = filterProps(props);
  return <div {...props} />;
}

export default Base;