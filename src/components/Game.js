import React, { Component } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

import requireAuth from './HOC/requireAuth';
import * as Element from './elements';
import GuessList from './GuessList';
import TriviaQuestion from './TriviaQuestion';
import Scoreboard from './Scoreboard';
import GuessForm from './GuessForm';
import Winner from './Winner';

class Game extends Component {


  render() {
    return (
      <React.Fragment>
        <Element.Flex
          width="100%"
          p="1rem 2rem"
          zIndex="10"
        >
          <GuessList />
          <TriviaQuestion />
          
          
        </Element.Flex>
        <Element.Flex
          width="100%"
          justifyContent="space-around"
        >
          <Scoreboard />
          <Winner />
        </Element.Flex>
      </React.Fragment>
    )
  }
}

export default requireAuth(Game);