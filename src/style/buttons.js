export const button = {
	fordwardedAs: 'button',
	display: 'inline-block',
	verticalAlign: 'middle',
	textAlign: 'middle',
	fontFamily: 'inherit',
	appearance: 'none',
	cursor: 'pointer',
};
//THEME WILL BE PROVIDED TO FORM APP
export const squareButton = {
	display: 'inline-block',
	verticalAlign: 'middle',
	textAlign: 'center',
	fontSize: [1],
	minWidth: '2.5em',
	fontFamily: 'inherit',
	fontWeight: 'extraBold',
	lineHeight: ['condensed'],
	appearance: 'none',
	cursor: 'pointer',
	color: 'white',
	boxShadow: 'none',
	backgroundColor: 'transparent',
	textDecoration: 'none',
	transition: 'box-shadow 0.125s ease-out 0s',
	borderWidth: '2px',
	borderStyle: 'solid',
	borderColor: 'red',
	px: [2],
	py: [1],
};

export const disabledSquareButton = {
	...squareButton,
	cursor: 'default',
	color: 'gray',
};
