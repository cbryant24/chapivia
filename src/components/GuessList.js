import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import theme from './style/theme';

import GuessForm from './GuessForm';
import guessListQuery from '../queries/GuessList';
import { Text, TextAnimatedPseudo, Flex, FlexItem, Box, BoxAll } from './element';
import { noiseAnimation } from './style/animations';

import { useAuth } from '../hooks';


function GuessList(props) {
  const [ selectedPlayer, setSelectedPlayer ]             = useState(null);
  const {loading: guessListLoading, data: guessListData } = useQuery(guessListQuery);
  const { user }                                          = useAuth();

  const animationGuessNameStyle = {
    continuous: noiseAnimation(),
    duration_continuous: 3,
    iteration: 'infinite',
    animation_direction: 'alternate-reverse',
    animation_timing_function: 'linear'
  };
  
  const animatedGuessNameStyle = {
    pseudo: true,
    width: [1],
    textTransform: "uppercase",
    position: "relative",
    textAlign: "start",
    fontSize: [3],
    fontWeight: "500",
    pl: "2rem",
    my: [1],
    animation: {...animationGuessNameStyle, duration_continuous: 2}
  };

  const {animation, pseudo, ...guessNameStyle} = animatedGuessNameStyle

  const beforeGuessNameStyle = {
    position: 'absolute',
    pl: "2rem",
    left:'-2px',
    textShadow: '1px 0 blue', 
    color: 'white',
    overflow: 'hidden',
    clip: 'rect(0,900px,0,0)', 
    animation: {...animationGuessNameStyle, duration_continuous: 3}
  };

  const afterGuessNameStyle = {
    position: 'absolute',
    pl: "2rem",
    left:'2px',
    textShadow: '-1px 0 red', 
    color: 'white',
    overflow: 'hidden',
    clip: 'rect(0,900px,0,0)', 
    animation: {...animationGuessNameStyle, duration_continuous: 2}
  };

  function handleChangeCancel() {
    setSelectedPlayer(null);
  }

  function displayGuessesNonAdmin() {
    
    return (
      guessListData.guessedPlayers.map( guessedPlayer => (
        <Flex
          fontSize="1.6rem"
          textAlign="center"
          height="4rem"
          justifyContent="space-between"
          position="relative"
          key={guessedPlayer.id}
        >
          {Math.floor((Math.random() * 10) + 1) % 2 === 1 ? 
          <TextAnimatedPseudo
            {...animatedGuessNameStyle}
            before={{...beforeGuessNameStyle, content: guessedPlayer.name}}
            after={{...afterGuessNameStyle, content: guessedPlayer.name}}
          >
            {guessedPlayer.name}
          </TextAnimatedPseudo>
          :           
          <Text
            {...animatedGuessNameStyle}
          >
            {guessedPlayer.name}
          </Text>}

        </Flex>
      ))
    )
  }

  function dispalayGuesses() {
    const inputs = [
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
            options: [selectedPlayer]
          }
        },
        fieldStyle: { 
          width: '75%', 
          maxHeight: '5rem', 
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
      data: { name: 'guessForm', submit: 'signup', cb: null, cancel: handleChangeCancel },
      style: { height: '5vh', display: 'flex', justifyContent: 'space-around', },
    };
    
    if(guessListLoading || !user) return <FlexItem></FlexItem>;

    if(user.role !== "admin") return <FlexItem>{displayGuessesNonAdmin()}</FlexItem>;

    return (
      guessListData.guessedPlayers.map( guessedPlayer => {
        
        return selectedPlayer === guessedPlayer ? 
        (
          <Box
            height='7vh'
            my={[4]}
            mx={[1]}
          >
            <GuessForm
              form={form}
              inputs={inputs}
              buttons={buttons}
              cb={handleChangeCancel}
            /> 
          </Box>
        ) :
        (
          <Flex
            textAlign="center"
            justifyContent="space-between"
            position="relative"
            mb="5px"
            key={guessedPlayer.id}
          >
            {Math.floor((Math.random() * 10) + 1) % 2 === 1 ? 
            <TextAnimatedPseudo
              {...animatedGuessNameStyle}
              before={{...beforeGuessNameStyle, content: guessedPlayer.name}}
              after={{...afterGuessNameStyle, content: guessedPlayer.name}}
            >
              {guessedPlayer.name}
            </TextAnimatedPseudo>
            :           
            <Text
              {...animatedGuessNameStyle}
            >
              {guessedPlayer.name}
            </Text>}
            {selectedPlayer === guessedPlayer ? 
            <GuessForm
              form={form}
              inputs={inputs}
              buttons={buttons}
              cb={handleChangeCancel}
            /> : 
            <BoxAll
              //TODO: {PRODUCTION ISSUE} FIX APPEARANCE, TRANSITION, VERTICAL-ALIGN, CURSOR APPEARING TWICE
              isA="button"
              {...theme.squareButton}
              fontSize={[2]}
              textTransform="uppercase"
              letterSpacing="2px"
              height={1}
              onClick={ () => setSelectedPlayer(guessedPlayer) }
            >
              change
            </BoxAll>}
          </Flex>
        )
        
      })
    );
  }

  return (
    <BoxAll
      display="flex"
      flexDirection="column"
      minWidth="50%"
      height="auto"
      fontSizeModule={[1]}
    >
      <Text
        isA="h2"
        m="auto"
        textAlign="center"
        h2FontSize={[1]}
      >
        Todays Guesses
      </Text>
      <FlexItem>
        {dispalayGuesses()}
      </FlexItem>
    </BoxAll>
  );
}

export default GuessList;
