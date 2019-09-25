import * as styledSystem from 'styled-system';
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

const H1FONTSIZES = system({
  h1FontSize: {
    property: 'fontSize',
    scale: 'h1FontSizes'
  }
});

const H2FONTSIZES = system({
  h2FontSize: {
    property: 'fontSize',
    scale: 'h2FontSizes'
  }
});

const H3FONTSIZES = system({
  h3FontSize: {
    property: 'fontSize',
    scale: 'h3FontSizes'
  }
});

const H4FONTSIZES = system({
  h4FontSize: {
    property: 'fontSize',
    scale: 'h4FontSizes'
  }
});

const H5FONTSIZES = system({
  h5FontSize: {
    property: 'fontSize',
    scale: 'h5FontSizes'
  }
});

const H6FONTSIZES = system({
  h6FontSize: {
    property: 'fontSize',
    scale: 'h6FontSizes'
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
  H1FONTSIZES,
  H2FONTSIZES,
  H3FONTSIZES,
  H4FONTSIZES,
  H5FONTSIZES,
  H6FONTSIZES,
  system({
    textTransform: true,
    textDecoration: true
  })
)

export const FLEX       = styledSystem.flexbox;
export const SHADOW     = styledSystem.shadow;
export const BACKGROUND = styledSystem.background;

export const ALL = styledSystem.compose(
  BORDER,
  BACKGROUND,
  FLEX,
  GRID,
  SHADOW,
  TYPOGRAPHY,
  TRANSITION
);

export const TEXTALL = styledSystem.compose(
  BORDER,
  BACKGROUND,
  FLEX,
  GRID,
  SHADOW,
  TRANSITION
);