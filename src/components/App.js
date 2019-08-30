import React from 'react';
import { Box, Flex } from './element';
import {ThemeProvider, GlobalStyle} from './element';
import Background from './Background';
import theme from './elements/theme';
import Title from './Title';


export default ({ children }) => {

  return (
          <Flex
            minHeight="100vh"
          >
            {/* <Background/> */}
            {children}
          </Flex>
  );
}
