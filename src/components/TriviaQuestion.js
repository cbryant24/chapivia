import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';
import theme from './style/theme';

// import { graphql } from 'react-apollo';

import mutation from '../mutations/Guess';
// import query from '../queries/Trivia';
import { DAILY_TRIVIA } from '../localState/Queries';
import UnguessedPlayers from '../queries/UnguessedPlayers';
import { useAuth } from '../hooks';

import GuessForm from './GuessForm';
import { Box, Grid, GridItem, Text, List, Item, Heading } from './element';

const TriviaQuestion = (props) => {
  const { data: { localTrivia } } = useQuery(DAILY_TRIVIA);
  const { loading: unguessedPlayersLoading, data: unguessedPlayersData } = useQuery(UnguessedPlayers);
  const { user } = useAuth();

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

  if (unguessedPlayersLoading) return <div></div>;
  
  unguessedPlayersData.nonGuessedPlayers && 
  unguessedPlayersData.nonGuessedPlayers[0].id !== null && 
  unguessedPlayersData.nonGuessedPlayers.unshift({id: null, name: null});

  const inputs = [
    user.role === "admin" ? 
    {
      data: {
        type: 'select', 
        name: 'player', 
        label: 'player', 
        initialValue: '',
        required: true,
        inputData: {
          display: 'name',
          value: 'id',
          options: unguessedPlayersData.nonGuessedPlayers
        }
      },
      fieldStyle: { 
        width: '75%', 
        maxHeight: '5rem', 
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      inputStyle: { background: 'white', color: 'black', borderRadius: '1em', minHeight: '2.5em' }
    } : null,
    {
      data: {
        type: 'password', 
        name: 'guess', 
        label: 'guess', 
        placeholder: 'enter guess A, B, C, D', 
        initialValue: '',
        required: true,
      },
      fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
      inputStyle: 'inputNormal'
    }
  ]

  const form = {
    data: { name: 'guessForm', submit: 'signup' },
    style: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-evenly', 
      flexDirection: 'column', 
      width: [1],
      zIndex: 20
    },
  }

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3]} },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ]

  return (
    <GridItem 
      gridRow={props.gridRow} 
      gridColumn={props.gridColumn}
      flexDirection="column"
      fontSizeModule={[1]}
    >
      <Text
        p="0 0 2rem 0"
      >
        {convertHTMLChar(localTrivia.question)}
      </Text>
      <Box
        isA="ul"
      >
        {displayTriviaChoices()}
      </Box>
      <GuessForm
        form={form}
        inputs={inputs}
        buttons={buttons}
      />
    </GridItem>
  );
}

export default TriviaQuestion;
