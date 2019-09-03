import React from 'react';
import { Box, Flex } from './element';
import {ThemeProvider, GlobalStyle} from './element';
import BackgroundTitle from './BackgroundTitle';
import theme from './elements/theme';


export default ({ children }) => {

  return (
          <Flex
            minHeight="100vh"
            flexDirection="column"
          >
            <BackgroundTitle/>
            {/* <Title/> */}
            {children}
          </Flex>
  );
}
