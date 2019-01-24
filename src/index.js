import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './components/elements/theme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Game from './components/Game';
import GameController from './components/GameController';
import App from './components/App';

import reducers from './reducers';
// import { client } from './reducers';

export const store = createStore(
  reducers,
  // applyMiddleware(reduxThunk)
);

// const networkInterface = createNetworkInterface({
//   uri: '/graphql',
//   opts: {
//     credentials: 'same-origin'
//   }
// });

const client = new ApolloClient();

ReactDOM.render(
  // <Provider store={store}>
  
    <ApolloProvider client={ client } >
      <Router>
        <ThemeProvider theme={theme}>
          <div style={{ position: 'relative' }}>
              <App>
                <Route path='/game' exact component={Game}/>
                {/* <Route path='' component={GameController}/> */}
                {/* <Route path='/signup' exact component={Signup}/> */}
                <Route path='/' exact component={Signin}/>
                <Route path='/signup' component={Signup}/>
              </App>
            </div>
        </ThemeProvider>
      </Router>
    </ApolloProvider>,
  // </Provider>,
  document.getElementById('root')
);
