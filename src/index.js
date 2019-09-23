import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {ThemeProvider, GlobalStyle} from './components/element';
import theme from './components/elements/theme';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { ModalProvider } from './components/element';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Game from './components/Game';
import GameController from './components/GameController';
import App from './components/App';

import { ModalBackground } from './components/elements';
import { LastLocationProvider } from 'react-router-last-location';
import typeDefs from './localState/typeDefs';

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
  uri: '/graphql',
});
// debugger

// client.writeData({

//     localTrivia: {}

// });

ReactDOM.render(
  <ApolloProvider client={ client } >
    <Router>
      <LastLocationProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ModalProvider BackgroundComponent={ModalBackground}>
            <div style={{ position: 'relative' }}>
              <App>
                <Route path='/game' exact component={Game}/>
                {/* <Route path='' component={GameController}/> */}
                <Route path='/' exact component={Signin}/>
                <Route path='/signup' component={Signup}/>
              </App>
            </div>
          </ModalProvider>
        </ThemeProvider>
      </LastLocationProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
