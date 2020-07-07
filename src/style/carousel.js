export const carouselNormal = {
	display: 'flex',
	flexWrap: 'wrap',
	width: [1],
	m: 'auto',
	minHeight: '100vh',
	maxWidth: '100vw',
	overflowX: 'hidden',
	zIndex: [1],
};

export const carouselActiveStyle = {
	transform: 'translateX(5px)',
	height: '7em',
	width: '15em',
	opacity: '1',
	py: [1],
	textAlign: 'center',
	border: '3px solid red',
	m: '1em',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
};

export const carouselInactiveStyle = {
	...carouselActiveStyle,
	pseudo: 'true',
	transform: 'translateX(0px)',
	opacity: '.5',
	transition: '1s all',
	hover: {
		transform: 'translateY(-5px)',
		visibility: 'visible',
		opacity: '1',
	},
};

export const sharedArrowContainerStyle = {
	position: 'absolute',
	opacity: '.25',
	cursor: 'pointer',
	width: '3em',
	height: '100%',
	backgroundColor: 'primary',
	padding: '5px 5px 6px 2px',
	zIndex: [2],
};

export const leftArrowContainerStyle = {
	...sharedArrowContainerStyle,
	left: '0%',
};

export const rightArrowContainerStyle = {
	...sharedArrowContainerStyle,
	right: '0%',
};

export const arrowStyle = {
	arrowColor: 'white',
	stroke: 'white',
	strokeWidth: '50',
	width: '3em',
	height: '3em',
	backgroundColor: 'primary',
	padding: '5px 5px 6px 2px',
};