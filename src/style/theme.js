import * as spaceSettings from 'style/space';
import * as formInputs from 'style/forms_inputs';
import * as buttons from 'style/buttons';
import * as flex from 'style/flex';
import * as links from 'style/links';
import * as modal from 'style/modal';
import * as carousel from 'style/carousel';

const red = '#e42d42';
const white = '#ffffff';
const black = '#000000';
const primary = red;
const secondary = '#4F4FEB';
const tertiary = '#30C8B9';

export const colors = {
	red,
	black,
	white,
	primary,
	secondary,
	tertiary,
};

const createMediaQuery = (n) => `@media screen and (min-width:${n}px)`;

const addAliases = (arr, aliases) =>
	aliases.forEach((key, i) =>
		//arr in this case can be either an arr or object since an array is an object with
		//key value pairs that are simply numbers e.g [1: arrItem1, 2: arrItem2 etc]
		Object.defineProperty(arr, key, {
			enumerable: false,
			get() {
				return this[i];
			},
		})
	);

const aliases = ['sm', 'md', 'lg', 'xl'];
export const breakpoints = ['544px', '768px', '1012px', '1280px'];

export const mediaQueries = {
	...breakpoints.map(createMediaQuery),
	reduceMotion: '@media (prefers-reduced-motion: reduce)',
	reduceTransparency: '@media (prefers-reduced-transparency: reduce)',
};

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

const emoji = '"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
export const font = `development,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif,${emoji}`;
export const mono = 'SFMono-Regular,"Roboto Mono",Menlo,monospace';

export const fontSizes = [0, '1.2em', '1.6em', '1.8em', '2em'];

//margin/padding[all, left, right top bottom]
//grid [grid-gap, grid-column-gap, grid-row-gap]
export const space = [0, '.5em', '1em', '1.5em', '2em'];

//width, height, min-width, max-width, min-height, max-height
export const sizes = ['0%', '100%', '50%', '33%', '25%', '20%', '10%'];

export const lineHeights = { condensedUltra: 1, condensed: 1.25, default: 1.5 };

//fontSizesModule is used to size for repsonsiveness using the css design philospohy
//of modular design with font-size rem for global design and font-size em for local design
//see https://css-tricks.com/rem-global-em-local/ for explanation `fontSizesModule` is a
//custom system-styled property that can be used with the scale for parent module font-size design
export const fontSizesModule = [0, '.5rem', '1rem', '1.5rem', '2rem'];

export const light = 300;
export const regular = 400;
export const bold = 600;
export const extraBold = 700;

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = { light, regular, bold, extraBold };

// default transition
export const transition = 'all 0.125s ease-out';

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
	baseShadow + `0 24px 24px 0 ${shadowColor}`,
];

export const zIndices = [0, 1, 5, 10];

//DEFAULT INPUT STYLING

export const buttonPadding = [0, '.5em', '1em'];

// export const hexa = (color, alpha) => {
//   const hex = cx(color);
//   if (!includes(hex, '#')) return shadowColor
//   const r = parseInt(hex.slice(1, 3), 16),
//     g = parseInt(hex.slice(3, 5), 16),
//     b = parseInt(hex.slice(5, 7), 16)

//   if (alpha >= 0) {
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`
//   } else {
//     return `rgb(${r}, ${g}, ${b})`
//   }
// }

export const linkStyle = {
	pseudo: 'true',
	color: white,
	hover: { color: red },
};

const theme = {
	...spaceSettings,
	...formInputs,
	...buttons,
	...flex,
	...links,
	...modal,
	...carousel,
	breakpoints,
	mediaQueries,
	font,
	mono,
	fontSizes,
	fontSizesModule,
	fontWeights,
	transition,
	boxShadows,
	zIndices,
	sizes,
	colors,
	lineHeights,
	space,
};

export default theme;
