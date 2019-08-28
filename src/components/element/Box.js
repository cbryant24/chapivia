import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { COMMON, addPseudo } from './utils';
import { filterProps } from './utils';
import cleanElement from 'clean-element';
import css from '@styled-system/css';

const Base = props => {
  const { isA, ...newProps} = props;
  const next = filterProps(newProps);
  // const Div = styled.div``;
  const type = isA || 'div';
  // console.log(as);
  // if (props.isA === 'form') {
  //   debugger
  // }
  //TODO: If issue with children check props.children here
  const element = React.createElement(type, {...next}, props.children)
  // return isA ? <forms {...next} /> : <div {...next}/>
  // return <div  {...next}/>
  // return <Div {...next}/>;
  return element;
}

const Box = styled(Base)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  COMMON,
  addPseudo
)

export const BoxAnimated = styled(Box)`
  ${props => props.animation()}
`

export default Box;