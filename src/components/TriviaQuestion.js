import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AllHtmlEntities as Entities } from 'html-entities';
import theme from './style/theme';


import { DAILY_TRIVIA } from '../localState/Queries';
import UnguessedPlayers from '../queries/UnguessedPlayers';
import { useAuth } from '../hooks';

import GuessForm from './GuessForm';
import { Box, GridItem, Text, FlexItem } from '@cbryant24/styled-react';

const TriviaQuestion = (props) => {
  const { data: { localTrivia } }     = useQuery(DAILY_TRIVIA);
  const { 
    loading: unguessedPlayersLoading, 
    data: unguessedPlayersData }      = useQuery(UnguessedPlayers);
  const { user }                      = useAuth();

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
  
  // debugger
  unguessedPlayersData.nonGuessedPlayers && 
  unguessedPlayersData.nonGuessedPlayers.length > 0 &&
  unguessedPlayersData.nonGuessedPlayers.unshift({id: null, name: null});

  const inputs = user.role === "admin" ? 
  [
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
        maxHeight: '11rem',
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      inputStyle: { background: 'white', color: 'black', borderRadius: '1em', minHeight: '2.5em' }
    },
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
  ] : unguessedPlayersData.nonGuessedPlayers.some( nonGuessedPlayer => nonGuessedPlayer.id === user.id ) ? 
  [
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
          options: [user]
        }
      },
      fieldStyle: { 
        width: '75%', 
        maxHeight: '11rem', 
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      inputStyle: { background: 'white', color: 'black', borderRadius: '1em', minHeight: '2.5em' }
    },
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
  ] : null;

  const form = {
    data: { name: 'guessForm' },
    style: {
      display: 'flex',
      height: '100%',
      justifyContent: 'space-evenly', 
      flexDirection: 'column', 
      width: [1],
      zIndex: 20
    },
  };

  const buttons = [
    { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3]} },
    { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
  ];

  return (
    <GridItem 
      gridRow={props.gridRow} 
      gridColumn={props.gridColumn}
      flexDirection="column"
      fontSizeModule={[3]}
    >
    <Text
        isA="h2"
        textAlign="center"
      >
        Trivia Question
      </Text>
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
      {
        inputs ?
        <FlexItem
          zIndex={[2]}
          fontSizeModule={[4]}
          width={[1]}
        >
          <GuessForm
            form={form}
            inputs={inputs}
            buttons={buttons}
          /> 
        </FlexItem> :
        <Text fontSize={[2]}>You have already Guessed! Contact Admin to Change Your Answer.</Text>
      }
      
    </GridItem>
  );
}

export default TriviaQuestion;
