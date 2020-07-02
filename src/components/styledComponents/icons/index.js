import React from 'react';

import Back from './Back';
import Next from './Next';

const Icon = (props) => {
	switch (props.name) {
	case 'back':
		return <Back {...props} />;
	case 'next':
		return <Next {...props} />;
	default:
		return;
	}
};

export default Icon;
