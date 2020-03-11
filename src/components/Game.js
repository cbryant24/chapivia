import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useLastLocation } from 'react-router-last-location';
import { useRouter } from '../hooks';
import triviaQuery from '../queries/Trivia';

import Modal from './Modal';
import { Div, H3 } from '@cbryant24/styled-react';

import Winner from './Winner';
import GuessList from './GuessList';
import Scoreboard from './Scoreboard';
import TriviaQuestion from './TriviaQuestion';
import PrevMonthWinners from './PrevMonthWinners';

import { BorderPrimary, InfiniteCarousel } from './styledComponents';

import { useAuth, useWindowSize } from '../hooks';

const Game = props => {
  const { loading: triviaLoading, data: triviaData } = useQuery(triviaQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const lastLocation = useLastLocation() || {};
  const client = useApolloClient();
  const { user, userLoading } = useAuth();
  const router = useRouter();
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
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
    } catch (err) {
      //TODO: add proper error handling
      console.log('error getting trivia data', err);
    }
  }, [triviaData]);

  useEffect(() => {
    if (userLoading) return;

    if (!user) return router.push('/');

    if (lastLocation.pathname !== '/signup') return;

    toggleModal();
    setModalMessage(`Welcome To Chapivia ${user.name}!`);
  }, [user]);

  const toggleModal = e => setIsOpen(!isOpen);

  function displayGame() {
    const arr = [];
    for (let i = 0; i <= 11; i++) {
      arr.push(
        <Div
          width="85%"
          height="85%"
          border="1px solid purple"
          backgroundColor="red"
          color="white"
        >
          {i}
        </Div>
      );
    }

    // return (
    //   <InfiniteCarousel
    //     width="90vw"
    //     bp={50}
    //     carouselIndicator={true}
    //     carouselStyle={{ themeStyle: 'carouselNormal' }}
    //     carouselIndicatorStyle={{
    //       width: '50px',
    //       height: '25px',
    //       backgroundColor: 'white',
    //       color: 'black',
    //       margin: [1]
    //     }}
    //     arrowStyle={{
    //       arrowColor: 'white',
    //       stroke: "white",
    //       strokeWidth: "50",
    //       width: '30px',
    //       height: '30px',
    //       backgroundColor: 'primary',
    //       borderRadius: '9999px',
    //       padding: '5px 5px 6px 2px'
    //     }}
    //     initialSlide={10}
    //   >
    //     {arr}
    //   </InfiniteCarousel>
    // );

    return (
      <InfiniteCarousel
        width="90vw"
        bp={500}
        carouselIndicator={true}
        carouselStyle={{ themeStyle: 'carouselNormal' }}
        carouselIndicatorStyle={{
          width: [4],
          height: [1],
          backgroundColor: 'black',
          color: 'white',
          margin: [1]
        }}
        arrowStyle={{
          arrowColor: 'white',
          stroke: 'white',
          strokeWidth: '50',
          width: '30px',
          height: '30px',
          backgroundColor: 'primary',
          borderRadius: '9999px',
          padding: '5px 5px 6px 2px'
        }}
      >
        <BorderPrimary mx="3em" minHeight="100%">
          <GuessList />
        </BorderPrimary>
        <BorderPrimary mx="3em" minHeight="100%">
          <TriviaQuestion />
        </BorderPrimary>
        <BorderPrimary mx="3em" minHeight="100%">
          <Scoreboard />
        </BorderPrimary>
        <BorderPrimary mx="3em" minHeight="100%">
          <Winner />
        </BorderPrimary>
      </InfiniteCarousel>
    );
  }

  if (userLoading || triviaLoading) return <div></div>;

  return (
    <Div m={4} zIndex={2} width="100%">
      <H3 color="primary" themeStyle={['marginSmallY']} textAlign="center">
        Chapivia
      </H3>
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      {displayGame()}
    </Div>
  );
};

export default Game;
