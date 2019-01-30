import React, { Component } from 'react';
import { AllHtmlEntities as Entities } from 'html-entities';
import { GridItem, Heading, FlexItem, Span } from './elements';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import CorrectGuessesQuery from '../queries/CorrectGuesses';
import TriviaQuery from '../queries/Trivia';

import * as actions from '../actions';

class Winner extends Component {

  displayWinners() {
    if(this.props.winners.loading) return
    
    return this.props.winners.correctGuesses.map( (guesser, idx) => (
      <Heading.h3
        textTransform="uppercase"
        key={guesser.id}
        position="relative"
      >
        <Span.glitchAnimation
          glitchAnimation={`${idx % 2 === 0 ? guesser.name : ''}`}
        >
          {guesser.name}
        </Span.glitchAnimation>
      </Heading.h3>
    ));
  }

  convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  render() {
    if(new Date().getHours() < 15) return (
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        <Span>
          Check back after 3pm for the answer and winners
        </Span>
      </GridItem>
    )
    if(this.props.triviaData.loading) return <div></div>;

    return(
      <GridItem
        gridRow={this.props.gridRow}
        gridColumn={this.props.gridColumn}
      >
        <Span 
          position="relative"
          textTransform="uppercase"
          fontSize="3.6rem"
        >
          {this.convertHTMLChar(this.props.triviaData.trivia.questionChoice.correctChoice)}
        </Span>
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
