import React from 'react';
import { Div } from '@cbryant24/styled-react';

export const BorderPrimary = ({ children }) => (
  <Div
    className="styled-component-border-red"
    border="3px solid red"
    themeStyle={['paddingMedium']}
  >
    {children}
  </Div>
);
