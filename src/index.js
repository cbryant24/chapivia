import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './components/elements/theme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Game from './components/Game';
import GameController from './components/GameController';
import App from './components/App';

import reducers from './reducers';


export const store = createStore(
  reducers,
  {
    auth: {authenticated: localStorage.getItem('token')}
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      
        <App>
          <Route path='/game' exact component={Game}/>
          <Route path='' component={GameController}/>
          {/* <Route path='/signup' exact component={Signup}/> */}
          <Route path='/' exact component={Signin}/>
          <Route path='/signup' component={Signup}/>
        </App>
      </Provider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
