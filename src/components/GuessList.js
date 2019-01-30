import React, { Component } from 'react';
import { includes, keyBy, map } from 'lodash';
import { graphql, compose } from 'react-apollo'

import guessListQuery from '../queries/GuessList';
import triviaQuery from '../queries/Trivia';
import mutation from '../mutations/Guess';
import { GridItem, OutlineButton, Input, Image, Text, Flex, Field, FlexItem, Span } from './elements';

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

  handleGuessChange(player) {
    this.setState( () => ({
      selectedPlayer: player
    }));
  }

  handleGuessUpdate(event) {
    if(this.state.error || !this.state.updatedGuess ) return

    const { trivia } = this.props.triviaData;

    event.preventDefault();
    
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

  displayGuessesAfterDeadline() {
    return (
      this.props.guessList.guesses.map( (guess, idx) => (
        <Flex
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          justifyContent="space-between"
          position="relative"
          key={guess.id}
        >
          {/* <Image  width="25%" height="25%"borderRadius="9rem" src={kgrad}/> */}
          <Span.glitchAnimation
            textTransform="uppercase"
            fontSize="2.4rem"
            fontWeight="500"
            padding-left="2rem"
            glitchAnimation={`${idx % 2 === 1 ? guess.name : ''}`}
          >
            {guess.name}
          </Span.glitchAnimation>
        </Flex>
      ))
    )
        
  }

  dispalayGuesses() {
    if(this.props.guessList.loading) return <FlexItem></FlexItem>

    if(new Date().getHours() >= 15) return <FlexItem>{this.displayGuessesAfterDeadline()}</FlexItem>

    return (
      this.props.guessList.guesses.map( (guess, idx) => (
        <Flex
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          justifyContent="space-between"
          position="relative"
          key={guess.id}
        >
          {/* <Image  width="25%" height="25%"borderRadius="9rem" src={kgrad}/> */}
          <Span.glitchAnimation
            textTransform="uppercase"
            fontSize="2.4rem"
            fontWeight="500"
            padding-left="2rem"
            glitchAnimation={`${idx % 2 === 1 ? guess.name : ''}`}
          >
            {guess.name}
          </Span.glitchAnimation>
          <form onSubmit={event => this.handleGuessUpdate(event)}>
              {guess === this.state.selectedPlayer ?
              <Flex>
                <Field 
                  name="password"
                  type="password"
                  minHeight="1.1rem"
                  fontSize="1.1rem"
                  width="25%"
                  display="inline-block"
                  onChange={(event) => this.updateGuessChoice(event)}
                  value={this.state.updatedGuess}
                  justifyContent="space-around"
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
                />
              </Flex>
              : '*'}
            </form>
          <FlexItem>
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
            </FlexItem>
          </Flex>
      ))
    )
  }

  render() {
    return (
      < GridItem 
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        display="flex"
        flexDirection="column"
      >
        <Flex
          justifyContent="space-around"
        >
          <Text.p>Player</Text.p>
          <Text.p>Guess</Text.p>
        </Flex>
        <FlexItem>
          {this.dispalayGuesses()}
        </FlexItem>
      </GridItem>
    );
  }
}

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
