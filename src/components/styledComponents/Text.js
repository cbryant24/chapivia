import React from 'react';
import { Box } from '@cbryant24/styled-react';

export const Footnote = ({ children, isA = 'small', ...props }) => (
  <Box isA={isA} fontSize={['.25em']} color="primary" {...props}>
    {children}
  </Box>
);

export const LeftAlignText = ({ children, isA = 'p', ...props }) => (
  <Box isA={isA} textAlign="left" {...props}>
    {children}
  </Box>
);

export const RightAlignText = ({ children, isA = 'p', ...props }) => (
  <Box isA={isA} textAlign="right" {...props}>
    {children}
  </Box>
);
