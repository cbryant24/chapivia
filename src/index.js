import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './components/elements/theme';

import Signin from './components/Signin';
import Game from './components/Game';
import App from './components/App';

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App>
        <Route path='/game' exact component={Game}/>
        {/* <Route path='/signup' exact component={Signup}/> */}
        <Route path='/' exact component={Signin}/>
      </App>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
