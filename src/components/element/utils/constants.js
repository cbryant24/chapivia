import * as styledSystem from 'styled-system';
import * as cssProps from './cssHelpers';
import { addStyles } from './addStyles';

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

export const TEXTDECORATION = system({
  textDecoration: true
})

export const TYPOGRAPHY = styledSystem.typography;
export const LAYOUT = styledSystem.layout;
export const POSITION = styledSystem.position;
export const FLEX = styledSystem.flexbox;
export const GRID = styledSystem.grid;
export const SPACE = styledSystem.space;
export const COLOR = styledSystem.color;
export const SHADOW = styledSystem.color;
