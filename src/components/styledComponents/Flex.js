import React from 'react';
import { Box } from '@cbryant24/styled-react';

export const FlexItem3x4 = ({ children, isA = 'div', ...props }) => (
	<Box isA={isA} width={[3, 4]} {...props}>
		{children}
	</Box>
);

export const FlexItem3x4MbHide = ({ children, isA = 'div', ...props }) => (
	<Box isA={isA} width={[3, 4]} display={['none', 'block']} {...props}>
		{children}
	</Box>
);
