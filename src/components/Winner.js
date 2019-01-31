import React, { Component } from 'react';
import { AllHtmlEntities as Entities } from 'html-entities';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import CorrectGuessesQuery from '../queries/CorrectGuesses';
import TriviaQuery from '../queries/Trivia';

import { GridItem, Heading, FlexItem, Span } from './elements';
import * as Elements from './elements';

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
      <Elements.Flex
        flexDirection="column"
        width="50%"
      >
        <Elements.Heading.h1
          textTransform="uppercase"
        >
          Answer: {this.convertHTMLChar(this.props.triviaData.trivia.questionChoice.correctChoice)}!
        </Elements.Heading.h1>
        <Elements.Heading.h2
          textTransform="uppercase"
        >
          Correct Guesses:
        </Elements.Heading.h2>
        {this.displayWinners()}
      </Elements.Flex>
    );
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
