import React from 'react';
import { Flex } from './elements';
import { FlexSection } from './elements';
import ThemeProvider from './elements/ThemeProvider';
import theme from './elements/theme';
import Title from './Title';

export default ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      <FlexSection
        justifyContent="center"
        alignItems="center"
        bg="primary"
        height="100vh"
        flexDirection="column"
      >
      <Title />
        {children}
      </FlexSection>
    </ThemeProvider>
  );
}