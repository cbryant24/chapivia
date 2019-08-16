import { css } from 'styled-components';
import palx from 'palx';
import { get, includes, omit, range } from 'lodash';
import { style } from 'styled-system'

const red = '#e42d42'
const blue = '#2d9ce4'
const white = '#ffffff'
export const palette = palx(blue)

export const grays = {
  black: palette.black,
  slate: palette.gray[8],
  silver: palette.gray[7],
  smoke: palette.gray[2],
  snow: palette.gray[0],
  white: '#ffffff'
}

export const brand = {
  primary: white,
  accent: palette.indigo[4],
  success: palette.teal[5],
  info: palette.blue[5],
  warning: palette.orange[5],
  error: palette.red[7],
  muted: grays.silver
}

export const colors = {
  ...brand,
  ...grays,
  ...palette,
  red
}

export const cx = key => get(colors, key, key);

const createMediaQuery = n => `@media screen and (min-width:${n}px)`;

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
  //arr in this case can be either an arr or object since an array is an object with
  //key value pairs that are simply numbers e.g [1: arrItem1, 2: arrItem2 etc] 
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i]
      }
    })
  );

const aliases = ['sm', 'md', 'lg', 'xl'];
export const breakpoints = ['544px', '768px', '1012px', '1280px'];

export const mediaQueries = {
  ...breakpoints.map(createMediaQuery),
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)'
};

export const pseudoElements = {
  
}

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);
// debugger
const emoji = '"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
export const font = `development,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif,${emoji}`;
export const mono = 'SFMono-Regular,"Roboto Mono",Menlo,monospace';

export const fontSizes = [0, '1.6em', '1.4em', '1.2em', '.9em', '.8em' ];
export const space = [0, '1em', '1.4em', '1.6em', '2em'];
export const sizes = ['0%', '70vh', '60%', '40%', '20%'];
export const lineHeights = { "condensedUltra": 1, "condensed": 1.25, "default": 1.5 }

//fontSizesModule is used to size for repsonsiveness using the css design philospohy
//of modular design with font-size rem for global design and font-size em for local design
//see https://css-tricks.com/rem-global-em-local/ for explanation `fontSizesModule` is a 
//custom system-styled property that can be used with the scale for parent module font-size design
export const fontSizesModule = [0, '1rem', '2rem', '3em', '4rem']

export const light = 300;
export const regular = 400;
export const bold = 600;
export const extraBold = 700;

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = { light, regular, bold, extraBold };

export const scaleFactor = 17 / 16;
export const transition = '0.125s ease-out';

// styled-system’s `borderRadius` function can hook into the `radii` object/array
export const pill = '9999px';
export const radii = ['0px', '4px', '8px', '16px', pill];
export const radius = '5px';

export const shadowColor = 'rgba(0,0,0,0.16)';
export const baseShadow = '0 0 2px 0 rgba(0,0,0,.08),';
export const boxShadows = [
  baseShadow + `0 2px 4px 0 ${shadowColor}`,
  baseShadow + `0 4px 8px 0 ${shadowColor}`,
  baseShadow + `0 12px 12px 0 ${shadowColor}`,
  baseShadow + `0 24px 24px 0 ${shadowColor}`
];

//DEFAULT INPUT STYLING
export const inputMaxWidth = "38rem";
export const inputWidth = "100%";

export const hexa = (color, alpha) => {
  const hex = cx(color);
  if (!includes(hex, '#')) return shadowColor
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha >= 0) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

export const windowBorderStyle = css`
  border-radius: 2rem;
  border: 1rem solid;
  border-bottom-color: #121212;
  border-left-color: #080808;
  border-right-color: #080808;
  border-top-color: #020202;
`
const button = {
  fordwardedAs: "button",
  display: "inline-block",
  verticalAlign: 'middle',
  textAlign: 'middle',
  fontFamily: 'inherit',
  appearance: 'none',
  cursor: 'pointer',
}
//THEME WILL BE PROVIDED TO FORM APP 
export const squareButton = {
  display: "inline-block",
  verticalAlign: "middle",
  textAlign: "center",
  fontSizeModule: [1, 2],
  fontFamily: "inherit",
  fontWeight: "extraBold",
  lineHeight: "condensed",
  appearance: "none",
  cursor: "pointer",
  color: "white",
  boxShadow: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  transition: "box-shadow 0.125s ease-out 0s",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "currentcolor",
  px: [1, 2],
  py: [1, 2],
}

export const objectFits = ['cover', 'contain']

const theme = {
  objectFits,
  breakpoints,
  mediaQueries,
  mono,
  font,
  fontSizes,
  fontWeights,
  regular,
  bold,
  colors,
  radii,
  radius,
  pill,
  scaleFactor,
  transition,
  boxShadows,
  shadowColor,
  cx,
  hexa,
  inputMaxWidth,
  inputWidth,
  windowBorderStyle,
  button,
  squareButton,
  sizes,
  space,
  fontSizesModule,
  lineHeights
}

export default theme;