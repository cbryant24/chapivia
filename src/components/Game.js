import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useLastLocation } from 'react-router-last-location';

import triviaQuery from '../queries/Trivia';

import Modal from './Modal';
import { BoxBorder } from './element';

import Winner from './Winner';

import { useAuth } from '../hooks';

const Game = (props) => {
  const { loading: triviaLoading, data: triviaData }  = useQuery(triviaQuery);
  const [isOpen, setIsOpen]                           = useState(false);
  const [modalMessage, setModalMessage]               = useState('');
  const lastLocation                                  = useLastLocation() || {};
  const client                                        = useApolloClient();

  const { user } = useAuth();

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
      console.log('error getting trivia data', err)
    }
  }, [triviaData]);

  useEffect( () => {

    if (!user) return props.history.push('/');

    if (lastLocation.pathname !== '/signup') return;

    toggleModal();
    setModalMessage(`Welcome To Chapivia ${ user.name }!`);
  }, [user]);

  const toggleModal = e => setIsOpen(!isOpen);

  if (!user || triviaLoading) return <div></div>;

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      {/* <BoxBorder
        zIndex={[2]}
        mx={[4]}
        border="1px solid white"
        p={[2]}
      >
        <GuessList/>
      </BoxBorder>
      <BoxBorder
        zIndex={[2]}
        mx={[4]}
        border="1px solid white"
        p={[2]}
      >
        <TriviaQuestion/>
      </BoxBorder>
      <BoxBorder
        zIndex={[2]}
        mx={[4]}
        border="1px solid white"
        p={[2]}
      >
        <Scoreboard />
      </BoxBorder> */}
      <BoxBorder
        zIndex={[2]}
        mx={[4]}
        border="1px solid white"
        p={[2]}
      >
        <Winner/>
      </BoxBorder>
    </React.Fragment>
  )
}

export default Game;
