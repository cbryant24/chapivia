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
  ...palette
}

export const cx = key => get(colors, key, key);

const createMediaQuery = n => `@media screen and (min-width:${n}em)`;

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
export const breakpoints = [32, 48, 64, 80];

export const mediaQueries = {
  ...breakpoints.map(createMediaQuery),
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)'
};

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

// export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const emoji = '"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
export const font = `development,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif,${emoji}`;
export const mono = 'SFMono-Regular,"Roboto Mono",Menlo,monospace';

// export const fontSizes = ['12px', 14, 16, 20, 24, 32, 48, 64, 72, 96];
export const fontSizes = ['0rem', '.8rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2.2rem', '2.6rem', '3.2rem', '4.8rem', '6.0rem', '7.2rem'];
export const remSizes = range(0, 100).map( num => num / 10)
export const space = ['0rem', '1rem', '1.5rem', '2.0rem', '2.5rem', '3.0rem', '3.5rem', '4.0rem']

export const regular = 400;
export const bold = 700;

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = { regular, bold };


export const textTransform = style({
  //React prop name
  prop: 'textTransform',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'text-transform',
  // key for theme values
  key: 'textTransform',
  // convert number values to pixels
  numberToPx: false,
  // accessor function for transforming the value
  getter: n => n,
  // shorthand alias React prop name
  alias: 'tt'
});

// export const textShadow = style({
//   // React prop name
//   prop: 'textShadow',
//   // The corresponding CSS property (defaults to prop argument)
//   cssProperty: 'text-shadow',
//   // key for theme values
//   key: 'textShadow',
//   // convert number values to pixels
//   numberToPx: false,
//   // accessor function for transforming the value
//   getter: n => n,
//   // shorthand alias React prop name
//   alias: 'sh'
// });

export const clipPath = style({
  // React prop name
  prop: 'clipPath',
  // The corresponding CSS property (defaults to prop argument)
  cssProperty: 'clip-path',
  // key for theme values
  key: 'clipPath',
  // convert number values to pixels
  numberToPx: false,
  // accessor function for transforming the value
  getter: n => n,
  // shorthand alias React prop name
  alias: 'cp'
});

// export const backgroundColor = style({
//   prop: 'backgroundColor',
//   cssProperty: 'background-color',
//   key: 'backgroundColor',
//   numberToPx: false,
//   getter: n => n,
//   alias: 'bc'
// });

// export const opacity = style({
//   prop: 'opacity',
//   cssProperty: 'opacity',
//   key: 'opacity',
//   numberToPx: false,
//   getter: n => n,
//   alias: 'op'
// })

export const fontSmooth = style({
  prop: 'fontSmooth',
  cssProperty: '-webkit-font-smoothing',
  key: 'fontSmooth',
  numberToPx: false,
  getter: n => n,
  alias: 'fsh'
});

export const transformOrigin = style({
  prop: 'transformOrigin',
  cssProperty: 'transform-origin',
  key: 'transformOrigin',
  numberToPx: false,
  getter: n => n,
  alias: 'to'
});

export const transform = style({
  prop: 'transform',
  cssProperty: 'transform',
  key: 'transform',
  numberToPx: false,
  getter: n => n,
  alias: 'tf'
});

export const content = style({
  prop: 'content',
  cssProperty: 'content',
  key: 'content',
  numberToPx: false,
  getter: n => n,
  alias: 'ct'
});

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

const theme = {
  breakpoints,
  mediaQueries,
  space,
  mono,
  font,
  fontSizes,
  remSizes,
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
  windowBorderStyle
}

export default theme;