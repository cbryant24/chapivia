import * as styledSystem from 'styled-system';
import * as cssProps from './cssHelpers';
import { addStyles } from './utilsStyles';

const { compose, system } = styledSystem;

const APPEARANCE = system({
  appearance: true
});

const FONTSIZESMODULES = system({
  fontSizeModule: {
    property: 'fontSize',
    scale: 'fontSizesModule'
  }
});

export const COMMON = compose(
  styledSystem.space,
  styledSystem.color,
  styledSystem.layout,
  styledSystem.zIndex,
  APPEARANCE,
  FONTSIZESMODULES,
);

export const BORDER = compose(
  styledSystem.border,
  styledSystem.shadow
);

export const TRANSITION = system({
  transition: true,
  transitionDelay: true,
  transitionDuration: true,
  transitionProperty: true,
  transitionTimingFunction: true
});

export const CURSOR = system({
  cursor: true
});
//TODO Add typography to this and change to TYPOGRAPHY
export const TEXTDECORATION = system({
  textDecoration: true
});

export const GRID = compose(
  styledSystem.grid,
  system({
    'grid-row-start': true,
    'grid-column-start': true,
    'grid-row-end': true,
    'grid-column-end': true,
    'itemname': true,    
  })
);

export const POSITION = compose(
  styledSystem.position,
  styledSystem.top,
  styledSystem.right,
  styledSystem.bottom,
  styledSystem.left
);

export const TYPOGRAPHY = styledSystem.typography;
export const FLEX       = styledSystem.flexbox;
export const SHADOW     = styledSystem.shadow;
export const BACKGROUND = styledSystem.background;

export const ALL = styledSystem.compose(
  BORDER,
  BACKGROUND,
  CURSOR,
  FLEX,
  GRID,
  POSITION,
  SHADOW,
  TYPOGRAPHY,
  TEXTDECORATION,
  TRANSITION
);