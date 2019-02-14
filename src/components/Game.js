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
        <Element.Grid
          width="100%"
          p="1rem 2rem"
          zIndex="10"
          templateColumns="1fr 1.5fr .5fr"
          templateRows="1fr 1fr"
          gridGap="2rem 4rem"
          justifyContent="space-between"
        >
          <Element.GridItem
            gridRow="1 / span 2"
            gridColumn="1 / span 1"
          >
            <GuessList />
          </Element.GridItem>
          <Element.GridItem
            gridRow="1 / span 1"
            gridColumn="2 / span 1"
          >
            <TriviaQuestion />
          </Element.GridItem>
          <Element.GridItem
            gridRow="1 / span 2"
            gridColumn="3 / span 1"
          >
            <Scoreboard />
          </Element.GridItem>
          <Element.GridItem
            gridRow="2 / span 1"
            gridColumn="2 / span 1"
          >
            <Winner />
          </Element.GridItem>
        </Element.Grid>
      </React.Fragment>
    );
  }
}

export default requireAuth(Game);