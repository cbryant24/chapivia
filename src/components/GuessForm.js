import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { GridItem, Field, OutlineButton, Input } from './elements';

class GuessForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {
       guess: '',
       player: '' 
      },
      guess: '',
      selectedPlayer: '',
    }
  }

  componentWillMount() {
    this.props.getPlayers();
  }

  addPlayersToForm() {
    const players = [];
    for ( let player in this.props.players) {
      if( !this.props.playersGuessed.some( guesser => guesser.name === player) )
        players.push(<option key={player} value={player}>{player}</option>)
    }
    return players;
  }

  handleGuessSelection(event) {
    const guess = event.target.value.toUpperCase();
    if ( !["A", "B", "C", "D"].includes(guess) ) {
      return this.setState( () => ({ 
        guess: '',
        error: {
          guess: 'Enter either A, B, C, D'
        }
      }));
    }
    return this.setState(() => ({ guess }));
  }

  handleSubmit(event) {
    event.preventDefault();
    if( !this.state.guess || !this.state.selectedPlayer ) {
      return this.setState(() => ({
        error: {
          guess: this.state.guess ? '' : 'Enter a guess',
          player: this.state.selectedPlayer ? '' : 'Select a player'
        }
      }));
    }

    const playerGuessData = {
      playerId: this.props.players[this.state.selectedPlayer].id,
      guess: this.props.triviaData.triviaChoices[this.state.guess.charCodeAt(0) - 65],
      questionId: this.props.triviaData.triviaIds.questionId,
      questionChoiceId: this.props.triviaData.triviaIds.choiceId,
    }

    this.props.recordPlayerGuess(playerGuessData, this.props.getPlayerGuesses);
    this.clearForm();
  }

  handlePlayerSelect(event) {
    const {value: player} = event.target;
    this.setState( () => ({ selectedPlayer: player }) );
  }

  clearForm() {
    this.setState( () => ({ 
      error: {
        guess: '',
        player: '' 
       },
       guess: '',
       selectedPlayer: '',
    }))
  }

  render() {
    if(!this.props.gameStatus) return (
      <GridItem
        border="1px solid purple"
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        Checkback after 11:00am
      </GridItem>
    )
    if(this.props.announceAnswer) return (
      <GridItem
        border="1px solid purple"
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        Checkback for another trivia!
      </GridItem>
    )
    return (
      <GridItem
        border="1px solid purple"
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <Field
            name="select"
            type="select"
            label="Player"
            color="black"
            error={this.state.error.player}
            onChange={(event) => this.handlePlayerSelect(event)}
            value={this.state.selectedPlayer}
          >
            <option value=''></option>
            {this.addPlayersToForm()}
          </Field>
          <Field 
            name="guess"
            type="password"
            label="Guess"
            error={this.state.error.guess}
            value={this.state.guess}
            onChange={(event) => this.handleGuessSelection(event)}
          >
          </Field>
          <Input
            color="white"
            width="10rem"
            borderColor='primary'
            mt="1rem"
            type="submit"
            value="Submit"
          />
          <OutlineButton
            color="white"
            borderColor='primary'
            mt="1rem"
          >
            Cancel
          </OutlineButton>
        </form>
      </GridItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    todaysGuesses: state.players.playersGuessed,
    triviaData: state.trivia.triviaData,
    players: state.players.players,
    playersGuessed: state.players.playersGuessed,
    gameStatus: state.game.gameStatus,
    announceAnswer: state.game.announceAnswer
  }
};

export default connect(mapStateToProps, actions)(GuessForm);
