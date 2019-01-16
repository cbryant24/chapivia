import React from 'react';
import { Flex } from './elements';
import ThemeProvider from './elements/ThemeProvider';
import theme from './elements/theme';
import Title from './Title';

// import ErrorBoundary from './ErrorBoundary';

export default ({ children }) => {

  return (
      <ThemeProvider theme={theme}>
          <Flex
            fontFamily="VT323"
            justifyContent="center"
            windowBorder
            alignItems="center"
            bg="transparent"
            height="96%"
            boxShadow="inset 0 0 18rem #000, inset 0 0 3rem #000, 0 0 10rem #000"
            flexDirection="column"
            m="auto"
            width="98%"
            height="98vh"
          >
          <Flex 
            bgAnimation
            p="3rem 2rem"
            backgroundColor="#031e11"
            textShadow="0rem 0.2rem 1rem rgba(3, 30, 17, 1)"
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width="100%"
            zIndex="-1"
          />
          {/* <Flex
            background="linear-gradient(
              to bottom, 
              rgba(255, 255, 255, 0), 
              rgba(255, 255, 255, 0) 50%, 
              rgba(0, 0, 0, 0.2) 70%, 
              rgba(0, 0, 0, 0.6)
            );"
            backgroundSize="100% 0.3rem"
            top="0"
            left="0"
            borderRadius="2rem"
            height="100%"
            width="100%"
            position="absolute"
          /> */}
          <Flex
            backgroundImage="repeating-linear-gradient(
              to bottom,
              transparent 0,
              transparent 1px, #000 1px, #000 2px
            )"
            backgroundSize="100% 2px, cover"
            transformOrigin="50% 50%"
            transform="rotate(0)"
            content=""
            opacity="0.6"
            top="0"
            left="0"
            borderRadius="2rem"
            height="100%"
            width="100%"
            position="absolute"
            zIndex="5"
          />
          <Flex 
            background="radial-gradient(
              circle at center,
              rgba(27,212,89,1) 0%,
              rgba(27,212,89,0.88) 58%,
              rgba(21,235,92,0.57) 80%,
              rgba(19,94,29,0.27) 93%,
              rgba(10,23,12,0) 100%
            );"
            top="0"
            left="0"
            height="100%"
            width="100%"
            opacity="0.25"
            position="fixed"
            // bgAnimationGlow
          />
          <Title />
            {children}
          </Flex>
      </ThemeProvider>
  );
}