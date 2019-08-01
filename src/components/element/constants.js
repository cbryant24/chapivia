import * as styledSystem from 'styled-system';
import * as cssProps from './css-helpers';

const { compose } = styledSystem;

export const COMMON = compose(
  styledSystem.space,
  styledSystem.color,
  styledSystem.display
);

export const BORDER = compose(
  styledSystem.border,
  styledSystem.shadow
);

export const TYPOGRAPHY = styledSystem.typography;
export const LAYOUT = styledSystem.layout;
export const POSITION = styledSystem.position;
export const FLEX = styledSystem.flexbox;
export const GRID = styledSystem.grid;

