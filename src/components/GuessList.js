import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import theme from './style/theme';

import { includes, keyBy, map } from 'lodash';
import GuessForm from './GuessForm';
import guessListQuery from '../queries/GuessList';
import triviaQuery from '../queries/Trivia';
import mutation from '../mutations/Guess';
import currentUserQuery from '../queries/CurrentUser';
import { GET_PLAYER } from '../localState/Queries'
import { GridItem, OutlineButton, Input, Image, Text, Flex, Field, FlexItem, Box, BoxAll } from './element';
// import * as Element from './element';
import { generateRandomClipFrames, noiseAnimation } from './style/animations';
import FormApp from './Form/App';
import { validate } from './helpers/validators';
import { useAuth } from '../hooks';


function GuessList(props) {
  const [ selectedPlayer, setSelectedPlayer ] = useState(null);
  const {loading: currentUserLoading, data: currentUserData } = useQuery(currentUserQuery);
  const {loading: guessListLoading, data: guessListData } = useQuery(guessListQuery);
  const {loading: triviaLoading, data: triviaData } = useQuery(triviaQuery);
  const [ changeGuess, { data: guessedData }] = useMutation(mutation);
  const { data: playerData } = useQuery(GET_PLAYER);
  const { user } = useAuth();

  const guessNameStyle = {
    pseudo: true,
    textTransform: "uppercase",
    textAlign: "start",
    fontSize: [3],
    fontWeight: "500",
    paddingLeft: "2rem",
    my: [1],
    before: {
      content: '',
      position: 'absolute',
      left:'-2px',
      textShadow: '1px 0 blue', 
      color: 'white',
      overflow: 'hidden',
      clip: 'rect(0,900px,0,0)', 
    },
    before: {
      content: '',
      position: 'absolute',
      left:'-2px',
      textShadow: '1px 0 blue', 
      color: 'white',
      overflow: 'hidden',
      clip: 'rect(0,900px,0,0)', 
    },
    animation: {
      continuous: noiseAnimation(),
      duration_continous: 3,
      iteration: 'infinite',
      animation_direction: 'alternate-reverse',
      animation_timing_function: 'linear'
    },
    // glitchAnimation: {`${Math.floor((Math.random() * 10) + 1) % 2 === 1 ? guess.name : ''}`},
  }
  
  function handleGuessUpdate(event, vals) {

    if( props.signedIn.user.id !== selectedPlayer.id && props.signedIn.user.id !== "7") {
      return this.setState(() => ({
        error: 'Please guess only for yourself'
      }));
    }
    
    props.guessMutation({
      variables: {
        userId: selectedPlayer.id,
        questionId: props.triviaData.trivia.id,
        questionChoiceId: props.triviaData.trivia.questionChoice.id,
        guess: props.triviaData.trivia.questionChoice.choices[vals.guess.toUpperCase().charCodeAt(0) - 65]        
      }
    }).catch( res => {
      //TODO add error handling to guess mutation
      debugger
      const errors = res.graphQLErrors.map(error => error.message);
    });
    
    handleChangeCancel();
  }

  function handleChangeCancel() {
    setSelectedPlayer(null);
  }

  function displayGuessesNonAdmin() {
    
    return (
      guessListData.guessedPlayers.map( guess => (
        <Flex
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          justifyContent="space-between"
          position="relative"
          key={guess.id}
        >
          {/* <Image  width="25%" height="25%"borderRadius="9rem" src={kgrad}/> */}
          {Math.floor((Math.random() * 10) + 1) % 2 === 1 ? 
          <Text
            textTransform="uppercase"
            fontWeight="500"
            padding-left="2rem"
            animation="glitch"
          >
            {guess.name}
          </Text>
          : '' }
          <Box
            animation=''
          >
            {guess.name}
          </Box>
        </Flex>
      ))
    )
  }

  function dispalayGuesses() {
    const inputs = [
      {
        data: {
          type: 'password', 
          name: 'guess', 
          label: 'guess',
          initialValue: '',
          required: true
        },
        fieldStyle: { width: [1], height: ['15%'], justifyContent: 'space-between', flexDirection: 'column'},
        inputStyle: 'inputNormal'
      }
    ];

    const buttons = [
      { text: 'Submit', type: 'submit', cb: null, style: {...theme.squareButton, mr: [3]} },
      { text: 'Cancel', type: 'cancel', cb: null, style: 'squareButton' }
    ];
  
    const form = {
      data: { name: 'guessForm', submit: 'signup', cancel: handleChangeCancel },
      style: { height: '5vh', display: 'flex', justifyContent: 'space-around', px: '4rem',  },
    };
    
    if(guessListLoading || !user) return <FlexItem></FlexItem>;

    if(user.role !== "admin") return <FlexItem>{displayGuessesNonAdmin()}</FlexItem>;

    return (
      guessListData.guessedPlayers.map( guess => (
        <Flex
          textAlign="center"
          justifyContent="space-between"
          position="relative"
          mb="5px"
          key={guess.id}
        >
          <Text
            {...guessNameStyle}
          >
            {guess.name}
          </Text>
          {selectedPlayer === guess ? 
          <GuessForm
            form={form}
            inputs={inputs}
            buttons={buttons}
          /> : 
          <BoxAll
            //TODO: {PRODUCTION ISSUE} FIX APPEARANCE, TRANSITION, VERTICAL-ALIGN, CURSOR APPEARING TWICE
            isA="button"
            {...theme.squareButton}
            fontSize={[2]}
            textTransform="uppercase"
            letterSpacing="2px"
            height={1}
            onClick={ () => setSelectedPlayer(guess) }
          >
            change
          </BoxAll>}
        </Flex>
      ))
    );
  }

  return (
    < Flex         
      flexDirection="column"
      minWidth="50%"
      height="auto"
      fontSizeModule={[1]}
    >
      <Text
        isA="h2"
        textAlign="center"
        h2FontSize={[1]}
      >
        Todays Guesses
      </Text>
      <FlexItem>
        {dispalayGuesses()}
      </FlexItem>
    </Flex>
  );
}

export default GuessList;
