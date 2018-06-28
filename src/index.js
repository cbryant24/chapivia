import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { injectGlobal } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Signin from './components/Signin';

injectGlobal`
  html {
    /* This defines what 1rem is */
    font-size: 62.5%; /* //1 rem = 10px; 10px/16px = 62.5% */
  }

  *,
  *::after,
  *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }

  body {
    box-sizing: border-box;
    padding: 1rem;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.7;
    color: black;
  }
`

const Base = 
ReactDOM.render(
  <Router>
    <App>
      {/* <Route path='/' exact component={Welcome}/> */}
      {/* <Route path='/signup' exact component={Signup}/> */}
      <Route path='/' exact component={Signin}/>
    </App>
  </Router>,
  document.getElementById('root')
);
