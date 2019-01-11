import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import * as actions from '../actions';
import { GridItem, Field, OutlineButton, Input } from './elements';
import mutation from '../mutations/Guess';
import UnguessedPlayers from '../queries/UnguessedPlayers';
import TriviaQuery from '../queries/Trivia';
import GuessListQuery from '../queries/GuessList'



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

  addPlayersToForm() {
    const players = [];
    debugger
    this.props.players.nonGuessedPlayers.map( player => {
      players.push( <option key={player.id} value={player.id}>{player.name}</option> );
    });
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
    debugger
    event.preventDefault();
    if( !this.state.guess || !this.state.selectedPlayer ) {
      return this.setState(() => ({
        error: {
          guess: this.state.guess ? '' : 'Enter a guess',
          player: this.state.selectedPlayer ? '' : 'Select a player'
        }
      }));
    }

    // const playerGuessData = {
    //   playerId: this.props.players[this.state.selectedPlayer].id,
    //   guess: this.props.triviaData.triviaChoices[this.state.guess.charCodeAt(0) - 65],
    //   questionId: this.props.triviaData.triviaIds.questionId,
    //   questionChoiceId: this.props.triviaData.triviaIds.choiceId,
    // }

    debugger
    const { trivia } = this.props.triviaData;
    
    this.props.guessMutation({
      variables: {
        userId: this.state.selectedPlayer,
        questionId: trivia.id,
        questionChoiceId: trivia.questionChoice.id,
        guess: trivia.questionChoice.choices[this.state.guess.charCodeAt(0) - 65]        
      },
      refetchQueries: [{ query: UnguessedPlayers }, { query: GuessListQuery }]
    }).catch( res => {
      //TODO add error handling to guess mutation
      debugger
      const errors = res.graphQLErrors.map(error => error.message);
    });

    // this.props.recordPlayerGuess(playerGuessData, this.props.getPlayerGuesses);
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
    }));
  }

  render() {
    if(new Date().getHours() < 11) return (
      <GridItem
        border="1px solid purple"
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        Checkback after 11:00am
      </GridItem>
    );
    if(new Date().getHours() >= 15) return (
      <GridItem
        border="1px solid purple"
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        Checkback for another trivia!
      </GridItem>
    );
    if(this.props.players.loading) return <div></div>

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
            onChange={ (event) => this.handleGuessSelection(event) }
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

// export default graphql(mutations)(
//   graphql(query)(GuessForm)
// );

export default compose(
  graphql(UnguessedPlayers, {
    name: "players"
  }),
  graphql(TriviaQuery, {
    name: "triviaData"
  }),
  graphql(mutation, {
    name: 'guessMutation'
  })
)(GuessForm);