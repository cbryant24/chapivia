import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useLastLocation } from 'react-router-last-location';

import triviaQuery from '../queries/Trivia';

import Modal from './Modal';
import { Div } from '@cbryant24/styled-react';

import Winner from './Winner';
import GuessList from './GuessList';
import Scoreboard from './Scoreboard';
import TriviaQuestion from './TriviaQuestion';
import PrevMonthWinners from './PrevMonthWinners';
import Carousel from './Carousel';

import { useAuth, useWindowSize } from '../hooks';

const Game = (props) => {
  const { loading: triviaLoading, data: triviaData }  = useQuery(triviaQuery);
  const [isOpen, setIsOpen]                           = useState(false);
  const [modalMessage, setModalMessage]               = useState('');
  const lastLocation                                  = useLastLocation() || {};
  const client                                        = useApolloClient();
  const { user, userLoading }                         = useAuth();
  const { width: windowWidth }                        = useWindowSize();

  useEffect( () => {
    if (triviaLoading) return;

    try {
      client.writeData({
        data: {
          localTrivia: {
            questionId: triviaData.dailyTrivia.id,
            question: triviaData.dailyTrivia.question,
            questionChoices: triviaData.dailyTrivia.triviaChoices.choices,
            questionChoicesId: triviaData.dailyTrivia.triviaChoices.id,
            category: triviaData.dailyTrivia.category,
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

  function displayGame() {

    // if (windowWidth < 768) {
    //   return (
    //   <Carousel
    //     type={["single", "infinite"]}
    //     width="90vw"
    //     transition="all 1s"
    //     initialCarouselItemPos="translateX(0em)"
    //     initialCarouselItemPosOut="translateX(100em)"
    //     afterCarouselItemPosOut="translateX(-100em)"
    //   >
    //     {/* <TriviaQuestion /> */}
    //     {/* <GuessList /> */}
    //     <Scoreboard />
    //     {/* <Winner /> */}
    //   </Carousel>
    //   )
    // }

    return (
      <Div
      >
        {/* <Div>
          <GuessList/>
        </Div>
        <Div>
          <TriviaQuestion/>
        </Div>
        <Div>
          <Scoreboard />
        </Div>
        <Div>
          <Winner/>
        </Div> */}
      </Div>
    )
  }

  if (userLoading || triviaLoading) return <div></div>;

  return (
    <Div
      m={4}
      zIndex={2}
      width="100%"
      mt={["20%", "15%"]}
    >
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      {displayGame()}
    </Div>
  )
}

export default Game;
