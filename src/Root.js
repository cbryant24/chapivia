import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "./components/style";
import { ThemeProvider } from "@cbryant24/styled-react";
import theme from "./components/style/theme";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { ModalProvider } from "@cbryant24/styled-react";

import { LastLocationProvider } from "react-router-last-location";
import typeDefs from "./localState/typeDefs";
import { ProvideAuth } from "./hooks";

export default ({ children }) => {
  const client = new ApolloClient({
    clientState: {
      defaults: {
        localTrivia: {
          questionId: null,
          question: "",
          questionChoices: [],
          questionChoicesId: null,
          __typename: "dailyTrivia"
        }
      },
      resolvers: {},
      typeDefs
    },
    uri: "/graphql"
  });
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};
