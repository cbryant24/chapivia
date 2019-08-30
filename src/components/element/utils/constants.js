import * as styledSystem from 'styled-system';
import * as cssProps from './cssHelpers';
import { addStyles } from './utilsStyles';
import { zIndex } from 'styled-system'
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

export const CURSOR = system({
  cursor: true
});

export const COMMON = compose(
  styledSystem.space,
  styledSystem.color,
  styledSystem.layout,
  styledSystem.zIndex,
  styledSystem.position,
  APPEARANCE,
  FONTSIZESMODULES,
  CURSOR
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


//TODO Add typography to this and change to TYPOGRAPHY
export const TEXTDECORATION = system({
  textDecoration: true
});

export const GRID = compose(
  styledSystem.grid,
  system({
    gridRowStart: true,
    gridRowEnd: true,
    gridColumnStart: true,
    gridColumnEndt: true,
    itemName: true
  })
);

export const TYPOGRAPHY = compose(
  styledSystem.typography,
  system({
    'textTransform': true
  })
)

//export const TYPOGRAPHY = styledSystem.typography;
export const FLEX       = styledSystem.flexbox;
export const SHADOW     = styledSystem.shadow;
export const BACKGROUND = styledSystem.background;

export const ALL = styledSystem.compose(
  BORDER,
  BACKGROUND,
  CURSOR,
  FLEX,
  GRID,
  SHADOW,
  TYPOGRAPHY,
  TEXTDECORATION,
  TRANSITION
);