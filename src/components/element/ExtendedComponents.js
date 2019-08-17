import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import cleanElement from 'clean-element';
import { ALL} from './utils/constants';
import { addStyles, filterProps, addPseudo } from './utils'

const Base = props => {

  const Div = styled.div``;
  const next = filterProps(props);

  return <Div {...next} />;
}

export const ExtendedBox = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

export const ExtendedFlex = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    display: 'flex'
  },
  props => addStyles(props),
  ALL
)

export const ExtendedFlexItem = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

export const ExtendedGrid = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    display: 'grid'
  },
  props => addStyles(props),
  ALL
)

export const ExtendedGridItem = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

export const ExtendedText = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

// export const ExtendedInput = styled(Input)`
//   ${props => addStyles(props)}
// `;

export const ExtendedButton = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
)

export const ExtendedTestBox = styled(cleanElement(Base))(
  {
    boxSizing: 'border-box',
    minWidth: 0
  },
  props => props.pseudo ? addPseudo(props) : null,
  props => addStyles(props),
)