import * as styledSystem from 'styled-system';
import * as cssProps from './cssHelpers';
import { addStyles } from './utilsStyles';

const { compose, system } = styledSystem;

export const COMMON = compose(
  styledSystem.space,
  styledSystem.color,
  styledSystem.display
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

export const APPEARANCE = system({
  appearance: true
});

export const CURSOR = system({
  cursor: true
});
//TODO Add typography to this and change to TYPOGRAPHY
export const TEXTDECORATION = system({
  textDecoration: true
});

export const FONTSIZESMODULES = system({
  fontSizeModule: {
    property: 'fontSize',
    scale: 'fontSizesModule'
  }
});

export const BEFOREFONTSIZE = system({
  beforeFontSize: {
    property: '::before',
    scale: 'fontSizes'
  }
})

export const TYPOGRAPHY = styledSystem.typography;
export const LAYOUT     = styledSystem.layout;
export const POSITION   = styledSystem.position;
export const FLEX       = styledSystem.flexbox;
export const GRID       = styledSystem.grid;
export const SPACE      = styledSystem.space;
export const COLOR      = styledSystem.color;
export const SHADOW     = styledSystem.shadow;
export const BACKGROUND = styledSystem.background;
export const ZINDEX     = styledSystem.zIndex;

export const ALL = styledSystem.compose(
  APPEARANCE,
  BORDER,
  BACKGROUND,
  COLOR,
  CURSOR,
  FLEX,
  GRID,
  LAYOUT,
  POSITION,
  SPACE,
  SHADOW,
  TYPOGRAPHY,
  TEXTDECORATION,
  TRANSITION
);