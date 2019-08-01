import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './components/element/theme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ModalProvider } from './components/element/modal';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Game from './components/Game';
import GameController from './components/GameController';
import App from './components/App';
import { Flex, Box } from './components/element';

import styled from 'styled-components';

const client = new ApolloClient();

const BackgroundModal = <Box
                          display="flex"
                          position="fixed"
                          top="0"
                          left="0"
                          width="100vw"
                          height="100vh"
                          zIndex="30"
                          backgroundColor="rghba(255, 255, 255, .5)"
                          alignItems="center"
                          justifyContent="center"
                        />

//                   const RandomDiv = <div></div>

// const OtherModalBackground = styled.div`
//   display: flex;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   z-index: 30;
//   background-color: rgba(0, 0, 0, 0.5);
//   align-items: center;
//   justify-content: center;
// `
// debugger
ReactDOM.render(
  <ApolloProvider client={ client } >
    <Router>
      <ThemeProvider theme={theme}>
        <ModalProvider backgroundComponent={BackgroundModal}>
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
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
