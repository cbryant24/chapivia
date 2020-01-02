import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';
// import { compose, graphql } from 'react-apollo';
import CorrectGuessesQuery from '../queries/CorrectGuesses';
import TriviaAnswer from '../queries/TriviaAnswer';

import { Box, Text, Flex, FlexItem, BoxAnimated } from './element';
import * as Elements from './element';


const Winner = props => {
  const { loading: triviaAnswerLoading, data: triviaAnswerData }      = useQuery(TriviaAnswer);
  const { loading: correctGuessesLoading, data: correctGuessesData }  = useQuery(CorrectGuessesQuery);
  
  function displayWinners() {

    return correctGuessesData.correctGuesses.map( (guesser, idx) => (
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

  function convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  if (triviaAnswerLoading || correctGuessesLoading ) return <Box></Box>;

  if (!triviaAnswerData.triviaSolution) 
    return (
      <Text isA="p" textTransform="uppercase">
        Checkback after 5pm for the correct answer
      </Text>
    )

  return (
    <Flex
      flexDirection="column"
      width="100%"
      fontSizeModule={[2]}
    >
    <Text
      isA="h2"
      textAlign="center"
    >
      Yesterdays Trivia Answer & Winners
    </Text>
      <Text
        isA="p"
        textTransform="uppercase"
      >
        {new Date().getHours() >= 17 ? "Trivia" : "Yesterdays Trivia"}:&nbsp;
        {convertHTMLChar(triviaAnswerData.triviaSolution.question.question)}!
      </Text>
      <Text
        isA="p"
        textTransform="uppercase"
      >
        {new Date().getHours() >= 17 ? "Answer" : "Yesterdays Answer"}:&nbsp;
        {convertHTMLChar(triviaAnswerData.triviaSolution.correctChoice)}!
      </Text>
      <Text
        isA="p"
        textTransform="uppercase"
      >
        {new Date().getHours() >= 17 ? "Correct Guesses" : "Yesterdays Correct Guesses"}:&nbsp;
      </Text>
      {displayWinners()}
    </Flex>
  );
}

export default Winner;
