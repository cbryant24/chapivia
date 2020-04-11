import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "./components/style";
import { ThemeProvider } from "@cbryant24/styled-react";
import theme from "./components/style/theme";

import { ModalProvider } from "@cbryant24/styled-react";

import { LastLocationProvider } from "react-router-last-location";
import { ProvideAuth } from "./hooks";

export default ({ children }) => {

  return (
      <ProvideAuth>
        <Router>
          <LastLocationProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <ModalProvider>{children}</ModalProvider>
            </ThemeProvider>
          </LastLocationProvider>
        </Router>
      </ProvideAuth>
  );
};
