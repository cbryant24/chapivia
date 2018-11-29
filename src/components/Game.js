import React, { Component } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

import requireAuth from './HOC/requireAuth';
import { Grid } from './elements';
import GuessList from './GuessList';
import TriviaQuestion from './TriviaQuestion';
import Scoreboard from './Scoreboard';
import GuessForm from './GuessForm';
import Winner from './Winner';

class Game extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    // const choices = shuffle([incorrectChoiceOne, incorrectChoiceTwo, 
    //   incorrectChoiceThree, correctChoice])

    try {

    } catch(e) {
      console.log(e)
      //TODO add react error response for data pull for question and choice database pull
    }
    
  }

  render() {
    return (
      <Grid
        templateColumns="repeat(5, [col-start] 1fr [col-end])"
        templateRows="[first-row-start] 1fr [first-row-end 
                      second-row-start] .5fr [second-row-end]"
        gridGap="1.5rem"
        alignContent="center"
        height="100vh"
        width="100%"
        p="1rem 2rem"
      >
        <GuessList 
          gridRow="first-row-start / first-row-end" 
          gridColumn="col-start 1 / col-end 2"
        />
        <TriviaQuestion 
          gridRow="first-row-start / first-row-end" 
          gridColumn="col-start 3 / col-end 4"
        />
        <Scoreboard 
          gridRow="first-row-start / first-row-end" 
          gridColumn="col-start 5 / col-end 5"
        />
        <GuessForm 
          gridRow="second-row-start / second-row-end" 
          gridColumn="col-start 1 / col-end 2"
        />
        <Winner 
          gridRow="second-row-start / second-row-end"
          gridColumn="col-start 3 / col-end 5"
          border="1px solid brown"
        />
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameStatus: state.game.gameStatus
  }
}

export default compose(
  connect(mapStateToProps),
  requireAuth
)(Game)
