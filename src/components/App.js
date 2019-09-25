import React from 'react';
import { Box, Flex } from './element';
import BackgroundTitle from './BackgroundTitle';
import theme from './style/theme';

// import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';



export default ({ children }) => {

  return (
          <Flex
            minHeight="100vh"
            flexDirection="column"
            justifyContent="center"
          >
            <BackgroundTitle/>
            {children}
          </Flex>
  );
}
