import React from "react";
import { GlobalStyle } from "./components/style";
import { ThemeProvider } from "@cbryant24/styled-react";
import theme from "./components/style/theme";

import { ModalProvider } from "@cbryant24/styled-react";

import { ProvideAuth } from "hooks";

export default ({ children }) => {
  return (
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </ProvideAuth>
  );
};
