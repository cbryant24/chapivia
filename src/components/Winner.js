import React, { Component } from 'react';
import { AllHtmlEntities as Entities } from 'html-entities';
import { GridItem, Heading, FlexItem, Span } from './elements';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import CorrectGuessesQuery from '../queries/CorrectGuesses';
import TriviaQuery from '../queries/Trivia';

import * as actions from '../actions';

class Winner extends Component {
  componentWillMount() {
    // this.props.getCorrectGuessers();
  }

  componentDidUpdate(prevProps) {
    if(this.props.announceAnswer && this.props.announceAnswer !== prevProps.announceAnswer) {
      // this.props.getCorrectGuessers();
    }
  }

  displayWinners() {
    if(this.props.winners.loading) return
    
    return this.props.winners.correctGuesses.map( guesser => (
      <Heading.h4
        textTransform="uppercase"
        key={guesser.id}
      >
        {guesser.name}
      </Heading.h4>
    ));
  }

  convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  render() {
    // const {triviaData, }
    if(new Date().getHours() < 19) return (
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid brown"
      >
      <Span
        joltAnimation
        display="inline-block"
      >
        <Span
          glitchBefore
          glitchAfter
          boxText="Winners"
          fontSize="40px"
          position="relative"
        >
          Winners
        </Span>
      </Span>
      
      </GridItem>
    )
    if(this.props.triviaData.loading) return <div></div>;

    return(
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
        border="1px solid brown"
      >
        <Heading.h3 textTransform="uppercase">
          {this.convertHTMLChar(this.props.triviaData.trivia.questionChoice.correctChoice)}
        </Heading.h3>
        {this.displayWinners()}
      </GridItem>
    )
  }
}

export default compose(
  graphql(TriviaQuery, {
    name: "triviaData"
  }),
  graphql(CorrectGuessesQuery, {
    name: "winners"
  })
)(Winner);