import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';
// import { compose, graphql } from 'react-apollo';
import CorrectGuessesQuery from '../queries/CorrectGuesses';
import TriviaAnswer from '../queries/TriviaAnswer';

import { GridItem, Text, FlexItem, BoxAnimated } from './element';
import * as Elements from './element';

class Winner extends Component {

  displayWinners() {
    if(this.props.winners.loading) return
    
    return this.props.winners.correctGuesses.map( (guesser, idx) => (
      <Text
        isA="h3"
        textTransform="uppercase"
        key={guesser.id}
        position="relative"
      >
        <BoxAnimated
          isA="span"
          glitchAnimation={`${Math.floor((Math.random() * 10) + 1) % 2 === 1 ? guesser.name : ''}`}
        >
          {guesser.name}
        </BoxAnimated>
      </Text>
    ));
  }

  convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  render() {
    
    if(this.props.trivia.loading) return <div></div>;
    
    if (!this.props.trivia.correctAnswer) 
      return <div>Checkback after 5pm for the trivia answer and winners</div>;
    
    return(
      <Elements.Flex
        flexDirection="column"
        width="100%"
      >
        <Text
          isA="p"
          textTransform="uppercase"
        >
          {new Date().getHours() >= 17 ? "Trivia" : "Yesterdays Trivia"}:&nbsp;
          {this.convertHTMLChar(this.props.trivia.correctAnswer.question.question)}!
        </Text>
        <Text
          isA="p"
          textTransform="uppercase"
        >
          {new Date().getHours() >= 17 ? "Answer" : "Yesterdays Answer"}:&nbsp;
          {this.convertHTMLChar(this.props.trivia.correctAnswer.correctChoice)}!
        </Text>
        <Text
          isA="p"
          textTransform="uppercase"
        >
          {new Date().getHours() >= 17 ? "Correct Guesses" : "Yesterdays Correct Guesses"}:&nbsp;
        </Text>
        {this.displayWinners()}
      </Elements.Flex>
    );
  }
}

// export default compose(
//   graphql(TriviaAnswer, {
//     name: "trivia"
//   }),
//   graphql(CorrectGuessesQuery, {
//     name: "winners"
//   })
// )(Winner);

export default Winner;
