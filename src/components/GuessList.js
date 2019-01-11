import React, { Component } from 'react';
import axios from 'axios';
import { includes, keyBy, map } from 'lodash';
import update from 'immutability-helper';
import { graphql, compose } from 'react-apollo'

import { connect } from 'react-redux';

import * as actions from '../actions';
import guessListQuery from '../queries/GuessList';
import triviaQuery from '../queries/Trivia';
import mutation from '../mutations/Guess';
import { GridItem, Table, OutlineButton, Input, Image, Text, Flex, Field } from './elements';
import kgrad from '../img/kgrad.png';

class GuessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      selectedPlayer: {},
      updatedGuess: ''
    }
  }

  updateGuessChoice(event) {
    const updatedGuess = event.target.value.toUpperCase();

    if ( !["A", "B", "C", "D"].includes(updatedGuess) ) {
      return this.setState( () => ({ 
        updatedGuess: '',
        error: 'Enter either A, B, C, D'
      }));
    }

    this.setState( () => ({ updatedGuess }));

    return
  }

  displayTableHeaders(headers) {
    return (
      headers.map( title =>  {
        return (
          <Table.th
            key={title}
            m="2rem"
            textAlign="center"
            textTransform="uppercase"
          >
          {title}
        </Table.th>
        )
      })
    );
  }

  handleGuessChange(player) {
    this.setState( () => ({
      selectedPlayer: player
    }));
  }

  handleGuessUpdate(event) {
    if(this.state.error || !this.state.updatedGuess ) return

    const { trivia } = this.props.triviaData;

    event.preventDefault();
    debugger
    this.props.guessMutation({
      variables: {
        userId: this.state.selectedPlayer.id,
        questionId: trivia.id,
        questionChoiceId: trivia.questionChoice.id,
        guess: trivia.questionChoice.choices[this.state.updatedGuess.charCodeAt(0) - 65]        
      }
    }).catch( res => {
      //TODO add error handling to guess mutation
      debugger
      const errors = res.graphQLErrors.map(error => error.message);
    });
    
    this.setState( () => ({ 
      selectedPlayer: '',
      updatedGuess: ''
    }));
  }

  handleChangeCancel() {
    this.setState( () => ({ 
      selectedPlayer: '',
      updatedGuess: ''
    }))
  }

  dispalayGuesses() {
    if(this.props.guessList.loading) return <Table.tr></Table.tr>

    return (
      map(this.props.guessList.guesses, guess => (
        <Table.tr
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          key={guess.id}
        >
          <Table.td display="flex" width="100%"> 
            {/* <Image  width="25%" height="25%"borderRadius="9rem" src={kgrad}/> */}
            <Text.span
              textTransform="uppercase"
              fontSize="2.4rem"
              fontWeight="500"
              padding-left="2rem"
            >
              {guess.name}
            </Text.span>
          </Table.td>
          <Table.td width="20%">
          <form onSubmit={event => this.handleGuessUpdate(event)}>
              {guess === this.state.selectedPlayer ?
              <Flex
                justifyContent="space-around"
              >
                <Field 
                  name="password"
                  type="password"
                  minHeight="1.1rem"
                  fontSize="1.1rem"
                  width="25%"
                  display="inline-block"
                  onChange={(event) => this.updateGuessChoice(event)}
                  value={this.state.updatedGuess}
                >
                </Field>
                <Field
                  borderRadius="0"
                  borderWidth="2px"
                  minHeight="1rem"
                  border="20px solid white"
                  py="0"
                  px="0"
                  fontSize="1.1rem"
                  fontWeight="700"
                  type="submit"
                  value="Submit"
                  width="60%"
                />
              </Flex>
              : '*'}
            </form>
          </Table.td>
          <Table.td width="30%">
            { this.state.selectedPlayer === guess ? '': <OutlineButton
              bg="primary"
              fontSize="1.1rem"
              borderWidth="1px"
              color="white"
              px="4px"
              py="2px"
              mr="2px"
              borderRadius="2px"
              onClick={ () => this.handleGuessChange(guess) }
            >
              change
            </OutlineButton>}
            {guess === this.state.selectedPlayer ? 
            <OutlineButton
              bg="primary"
              fontSize="1.1rem"
              borderWidth="1px"
              color="white"
              px="4px"
              py="2px"
              ml="2px"
              borderRadius="2px"
              onClick={ () => this.handleChangeCancel(guess)}
            >
              cancel
            </OutlineButton> : ""}
          </Table.td>
        </Table.tr>
      ))
    )
  }

  render() {
    if(this.props.announceAnswer) return (
      <Table>
        <Table.body>
          <Table.tr border="1px solid black">
            {this.displayTableHeaders(['Name', 'Guessed', ""])}
          </Table.tr>
        </Table.body>
      </Table>
    );
    return (
      < GridItem 
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid yellow"
      >
        <Table
          width="100%"
        >
          <Table.body>
            <Table.tr border="1px solid black">
              {this.displayTableHeaders(['Name', 'Guessed', ""])}
            </Table.tr>
            {this.dispalayGuesses()}
          </Table.body>
        </Table>
      </GridItem>
    );
  
  }
}

// const mapStateToProps = state => {
//   return {
//     todaysGuesses: state.players.playersGuessed,
//     triviaData: state.trivia.triviaData,
//     announceAnswer: state.game.announceAnswer
//   }
// };

// export default connect(mapStateToProps, actions)(GuessList);

export default compose(
  graphql(guessListQuery, {
    name: "guessList"
  }),
  graphql(triviaQuery, {
    name: "triviaData"
  }),
  graphql(mutation, {
    name: 'guessMutation'
  })
)(GuessList);
