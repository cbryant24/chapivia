import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import * as actions from '../actions';
import { GridItem, Field, OutlineButton, Input, Flex } from './elements';
import mutation from '../mutations/Guess';
import UnguessedPlayers from '../queries/UnguessedPlayers';
import TriviaQuery from '../queries/Trivia';
import GuessListQuery from '../queries/GuessList';
import CurrentUserQuery from '../queries/CurrentUser';

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
    return (
      this.props.players.nonGuessedPlayers.map( player => {
        return <option key={player.id} value={player.id}>{player.name}</option>
      })
    );
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

    if( this.props.signedIn.user.id !== this.state.selectedPlayer && this.props.signedIn.user.id !== "7") {
      return this.setState(() => ({
        error: {
          player: 'Please guess only for yourself'
        }
      }));
    }

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

    this.clearForm(event);
  }

  handlePlayerSelect(event) {
    const {value: player} = event.target;
    this.setState( () => ({ selectedPlayer: player }) );
  }

  clearForm(event) {
    debugger
    event.preventDefault();

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
    // if(new Date().getHours() < 11) return (
    //   <GridItem
    //     gridRow={this.props.gridRow}
    //     gridColumn={this.props.gridColumn}
    //   >
    //     Checkback after 11:00am
    //   </GridItem>
    // );

    // if(new Date().getHours() >= 15) return (
    //   <GridItem
    //     gridRow={this.props.gridRow}
    //     gridColumn={this.props.gridColumn}
    //   >
    //     Checkback for another trivia!
    //   </GridItem>
    // );

    if(this.props.players.loading) return <div></div>

    return (
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <Field
            name="select"
            type="select"
            label="Player"
            color="black"
            width="75%"
            mb="2rem"
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
            width="75%"
            error={this.state.error.guess}
            value={this.state.guess}
            onChange={ (event) => this.handleGuessSelection(event) }
          >
          </Field>
          <Flex
            mt="1rem"
            justifyContent="flex-start"
          >
            <Input
              color="white"
              width="10rem"
              borderColor='primary'
              type="submit"
              value="Submit"
              mr="2rem"
            />
            <Input
              color="white"
              width="10rem"
              borderColor='primary'
              textAlign="center"
              type="cancel"
              value="Cancel"
              onClick={ (event) => this.clearForm(event)}
            />
          </Flex>
        </form>
        
      </GridItem>
    );
  }
}

export default compose(
  graphql(UnguessedPlayers, {
    name: "players"
  }),
  graphql(TriviaQuery, {
    name: "triviaData"
  }),
  graphql(mutation, {
    name: 'guessMutation'
  }),
  graphql(CurrentUserQuery, {
    name: 'signedIn'
  })
)(GuessForm);