import React from 'react';
import { Flex } from './element';
import {ThemeProvider, GlobalStyle} from './element';
import Background from './Background';
import theme from './elements/theme';
import Title from './Title';

// import ErrorBoundary from './ErrorBoundary';

export default ({ children }) => {

  return (
      // <ThemeProvider theme={theme}>
      //     <GlobalStyle />
          <Flex id="hello">
            {/* <Background/> */}
            {children}
          </Flex>
      // </ThemeProvider>
  );
}
