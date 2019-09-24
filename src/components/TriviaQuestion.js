import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';

// import { graphql } from 'react-apollo';

import mutation from '../mutations/Guess';
// import query from '../queries/Trivia';
import { DAILY_TRIVIA } from '../localState/Queries';

import GuessForm from './GuessForm';
import { Box, Grid, GridItem, Text, List, Item, Heading } from './element';

const TriviaQuestion = (props) => {
  const { data: { localTrivia } } = useQuery(DAILY_TRIVIA);
  // debugger
  function displayTriviaChoices() {
    return (
      localTrivia.questionChoices.map( (choice, idx) => {
        return(
          <Box
            isA="li"
            pb="1rem"
            hover
            key={choice}
          >
            {String.fromCharCode(65 + idx)}: { convertHTMLChar(choice) }
          </Box>
        )
      })
    );
  }

  function convertHTMLChar(str) {
    const entities = new Entities();
    return entities.decode(str);
  }

  return (
    <GridItem 
      gridRow={props.gridRow} 
      gridColumn={props.gridColumn}
      flexDirection="column"
      fontFamily="VT323"
      fontSmooth="none"
    >
      <Text
        p="0 0 2rem 0;"
        fontSize="2.1rem"
      >
        {convertHTMLChar(localTrivia.question)}
      </Text>
      <Box
        isA="ul"
      >
        {displayTriviaChoices()}
      </Box>
      <GuessForm/>
    </GridItem>
  );
}

export default TriviaQuestion;
