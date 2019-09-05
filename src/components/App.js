import React, { useEffect } from 'react';
import { Box, Flex } from './element';
import {ThemeProvider, GlobalStyle} from './element';
import BackgroundTitle from './BackgroundTitle';
import theme from './elements/theme';

// import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';



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
