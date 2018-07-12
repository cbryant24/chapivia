import React, { Component } from 'react';
import { Grid } from './elements';
import GuessList from './GuessList';
import TriviaQuestion from './TriviaQuestion';
import Scoreboard from './Scoreboard';
import GuessForm from './GuessForm';
import Winner from './Winner';

class Game extends Component {

  render() {
    return (
      <Grid
        templateColumns="repeat(2, [col-start] 1fr [col-end]) [last-col-start] .5fr [last-col-end]"
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
          gridColumn="col-start 1 / col-end 1"
        />
        <TriviaQuestion 
          gridRow="first-row-start / first-row-end" 
          gridColumn="col-start 2 / col-end 2"
        />
        <Scoreboard 
          gridRow="first-row-start / first-row-end" 
          gridColumn="last-col-start / last-col-end"
        />
        <GuessForm 
          gridRow="second-row-start / second-row-end" 
          gridColumn="col-start 1 / col-end 2"
        />
        <Winner 
          gridRow="second-row-start / second-row-end"
          gridColumn="last-col-start / last-col-end"
          border="1px solid brown"
        />
      </Grid>
    )
  }
}

export default Game
