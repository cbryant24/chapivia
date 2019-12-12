import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useLastLocation } from 'react-router-last-location';

import triviaQuery from '../queries/Trivia';

import Modal from './Modal';
import { Box, BoxBorder } from './element';

import Winner from './Winner';
import GuessList from './GuessList';
import Scoreboard from './Scoreboard';
import TriviaQuestion from './TriviaQuestion';
import Carousel from './Carousel';

import { useAuth } from '../hooks';

const Game = (props) => {
  const { loading: triviaLoading, data: triviaData }  = useQuery(triviaQuery);
  const [isOpen, setIsOpen]                           = useState(false);
  const [modalMessage, setModalMessage]               = useState('');
  const lastLocation                                  = useLastLocation() || {};
  const client                                        = useApolloClient();
  const { user, userLoading }                         = useAuth();
  const carouselAnimationsTransitions                 = {
    transition: "all 1s linear",
    in: "translateX(0em)",
    out: "translateX(-100em)",
    initial: "translate(100em)"
  }

  useEffect( () => {
    if (triviaLoading) return;
    // debugger
    try {

      client.writeData({
        data: {
          localTrivia: {
            questionId: triviaData.dailyTrivia.id,
            question: triviaData.dailyTrivia.question,
            questionChoices: triviaData.dailyTrivia.triviaChoices.choices,
            questionChoicesId: triviaData.dailyTrivia.triviaChoices.id,
            __typename: 'dailyTrivia'
          }
        }
      });
    } catch(err) {
      //TODO: add proper error handling
      console.log('error getting trivia data', err);
    }
  }, [triviaData]);

  useEffect( () => {

    if (userLoading) return;

    if (!user) return props.history.push('/');

    if (lastLocation.pathname !== '/signup') return;

    toggleModal();
    setModalMessage(`Welcome To Chapivia ${ user.name }!`);
  }, [user]);

  const toggleModal = e => setIsOpen(!isOpen);

  if (userLoading || triviaLoading) return <div></div>;

  return (
    <Box
      m={4}
      zIndex={2}
      mt={["20%", "15%"]}
    >
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      {/* <BoxBorder
        zIndex={[2]}
        //mx={[4]}
        border="1px solid white"
        p={[2]}
      > */}
        {/* <GuessList/> */}
        {/* <TriviaQuestion/> */}
      {/* </BoxBorder> */}
      <Carousel
        type={["single", "infinite"]}
        carouselAnimationsTransitions
        width="90vw"
      >
        {/* <Box carouselItem>Hello</Box>
        <Box carouselItem>WOrld</Box>
        <Box carouselItem initialItem>Goodbye</Box>
        <Box carouselItem>Cruel</Box>
        <Box carouselItem>People</Box>
        <Box><BoxBorder>Im on a boat</BoxBorder></Box> */}
        <GuessList
          width="100%"
          height="100%"
        />
        <TriviaQuestion
          width="100%"
          height="100%"
          transform="translateX(0em)"
        />
        <Scoreboard
          width="100%"
          height="100%"
          transform="translateX(-100em)"
        />
        <Winner 
          width="100%"
          height="100%"
          transform="translateX(-100em)"
        />
      </Carousel>
      {/* <BoxBorder
        zIndex={[2]}
        mx={[4]}
        border="1px solid white"
        p={[2]}
      >
        <TriviaQuestion/>
      </BoxBorder> */}
      {/* <BoxBorder
        zIndex={[2]}
        mx={[4]}
        border="1px solid white"
        p={[2]}
      >
        <Scoreboard />
      </BoxBorder>
      <BoxBorder
        zIndex={[2]}
        mx={[4]}
        border="1px solid white"
        p={[2]}
      >
        <Winner/>
      </BoxBorder> */}
    </Box>
  )
}

export default Game;
