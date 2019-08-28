import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ALL } from './utils/constants';
import Box from './Box';
import { addStyles, addPseudo } from './utils'


export const ExtendedBox = styled(Box)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
);

export const ExtendedFlex = styled(Box)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    display: 'flex'
  },
  props => addStyles(props),
  ALL
);

export const ExtendedFlexItem = styled(Box)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
);

export const ExtendedGrid = styled(Box)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    display: 'grid'
  },
  props => addStyles(props),
  ALL
);

export const ExtendedGridItem = styled(Box)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
);

export const ExtendedText = styled(Box)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
);

export const ExtendedButton = styled(Box)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  props => addStyles(props),
  ALL
);
