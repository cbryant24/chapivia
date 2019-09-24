import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { includes, keyBy, map } from 'lodash';
// import { graphql, compose } from 'react-apollo';

import guessListQuery from '../queries/GuessList';
import triviaQuery from '../queries/Trivia';
import mutation from '../mutations/Guess';
import currentUserQuery from '../queries/CurrentUser';
import { GET_PLAYER } from '../localState/Queries'
import { GridItem, OutlineButton, Input, Image, Text, Flex, Field, FlexItem, Box } from './element';
// import * as Element from './element';
import { generateRandomClipFrames } from './elements/animations';
import FormApp from './Form/App';
import { validate } from './helpers/validators';


function GuessList(props) {
  const [ selectedPlayer, setSelectedPlayer ] = useState(null);
  const {loading: currentUserLoading, data: currentUserData } = useQuery(currentUserQuery);
  const {loading: guessListLoading, data: guessListData } = useQuery(guessListQuery);
  const {loading: triviaLoading, data: triviaData } = useQuery(triviaQuery);
  const [ changeGuess, { data: guessedData }] = useMutation(mutation);
  const { data: playerData } = useQuery(GET_PLAYER);
  
  useEffect(() => {
    console.log(playerData)
    // debugger
  }, [playerData])

  function handleGuessUpdate(event, vals) {
    debugger

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

  function displayGuessesAfterDeadline() {
    
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
          <Box
            isA="span"
            textTransform="uppercase"
            fontSize="2.4rem"
            fontWeight="500"
            padding-left="2rem"
            animation="glitch"        
          >
            {guess.name}
          </Box>
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

  function handleChangeCancel() {
    setSelectedPlayer(null);
  }

  function dispalayGuesses() {
    const input = [
      {
        data: {
          type: 'password', 
          name: 'guess', 
          label: 'guess',
          initialValue: '',
          required: true
        },
        fieldStyle: { width: '75%', maxHeight: '5rem', justifyContent: 'space-between', flexDirection: 'column'},
        inputStyle: { color: 'black' }
      }
    ]
  
    const form = {
      data: { name: 'guessForm', submit: 'signup', cb: handleGuessUpdate, cancel: handleChangeCancel },
      style: { height: '5vh', justifyContent: 'space-around', flexDirection: 'column', px: '4rem',  },
    }
    
    if(guessListLoading || currentUserLoading) return <FlexItem></FlexItem>

    if(currentUserData.user.role !== "admin") return <FlexItem>{displayGuessesAfterDeadline()}</FlexItem>
    return (
      guessListData.guessedPlayers.map( guess => (
        <Flex
          fontSize="1.6rem"
          textAlign="center"
          justifyContent="space-between"
          position="relative"
          mb="5px"
          key={guess.id}
        >
          <Box
            isA="span"
            textTransform="uppercase"
            textAlign="start"
            fontSize="2.4rem"
            fontWeight="500"
            padding-left="2rem"
            glitchAnimation={`${Math.floor((Math.random() * 10) + 1) % 2 === 1 ? guess.name : ''}`}
          >
            {guess.name}
          </Box>
          {selectedPlayer === guess ? 
          <FormApp
            form={form}
            inputs={input}
            validate={validate}
          /> : 
          <Box
            isA="button"
            bg="primary"
            fontSize="1.1rem"
            borderWidth="1px"
            color="white"
            maxHeight="20px"
            borderRadius="2px"
            before="*"
            onClick={ () => setSelectedPlayer(guess) }
            >
              change
          </Box>}
        </Flex>
      ))
    )
  }

  return (
    < Flex         
      flexDirection="column"
      minWidth="50%"
      height="auto"
    >
      <Flex
        justifyContent="space-between"
      >
        <Text>Player</Text>
        <Text>Guess</Text>
      </Flex>
      <FlexItem>
        {dispalayGuesses()}
      </FlexItem>
    </Flex>
  );
}





// export default compose(
//   graphql(guessListQuery, {
//     name: "guessList"
//   }),
//   graphql(triviaQuery, {
//     name: "triviaData"
//   }),
//   graphql(mutation, {
//     name: 'guessMutation'
//   }),
//   graphql(CurrentUserQuery, {
//     name: 'signedIn'
//   })
// )(GuessList);

export default GuessList;