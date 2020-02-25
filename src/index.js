import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalStyle } from './components/style';
import { ThemeProvider } from '@cbryant24/styled-react';
import theme from './components/style/theme';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { ModalProvider } from '@cbryant24/styled-react';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Game from './components/Game';
import GameController from './components/GameController';
import App from './components/App';

import { LastLocationProvider } from 'react-router-last-location';
import typeDefs from './localState/typeDefs';
import { ProvideAuth } from './hooks';

const client = new ApolloClient({
  clientState: {
    defaults: {
      localTrivia: {
        questionId: null,
        question: '',
        questionChoices: [],
        questionChoicesId: null,
        __typename: 'dailyTrivia'
      }
    },
    resolvers: {},
    typeDefs
  },
  uri: '/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ProvideAuth>
      <Router>
        <LastLocationProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ModalProvider>
              <App>
                <Route path="/game" exact component={Game} />
                {/* <Route path='' component={GameController}/> */}
                <Route path="/" exact component={Signin} />
                <Route path="/signup" component={Signup} />
              </App>
            </ModalProvider>
          </ThemeProvider>
        </LastLocationProvider>
      </Router>
    </ProvideAuth>
  </ApolloProvider>,
  document.getElementById('root')
);
