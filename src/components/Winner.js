import React, { Component } from 'react';
import { AllHtmlEntities as Entities } from 'html-entities';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import CorrectGuessesQuery from '../queries/CorrectGuesses';
import TriviaAnswer from '../queries/TriviaAnswer';

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
    
    if(this.props.triviaAnswer.loading) return <div></div>;
    debugger
    return(
      <Elements.Flex
        flexDirection="column"
        width="100%"
      >
        <Elements.Text.p
          textTransform="uppercase"
        >
          Trivia: {this.convertHTMLChar(this.props.triviaAnswer.correctAnswer.question.question)}!
        </Elements.Text.p>
        <Elements.Heading.h2
          textTransform="uppercase"
        >
          Answer: {this.convertHTMLChar(this.props.triviaAnswer.correctAnswer.correctChoice)}!
        </Elements.Heading.h2>
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
  graphql(TriviaAnswer, {
    name: "triviaAnswer"
  }),
  graphql(CorrectGuessesQuery, {
    name: "winners"
  })
)(Winner);
