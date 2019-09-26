import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

// import { graphql, compose } from 'react-apollo';

import { GridItem, Field, OutlineButton, Input, FlexItem } from './element';
import * as Element from './element';

import mutation from '../mutations/Guess';
import UnguessedPlayers from '../queries/UnguessedPlayers';
// import TriviaQuery from '../queries/Trivia';
import GuessListQuery from '../queries/GuessList';
import CurrentUserQuery from '../queries/CurrentUser';
import { DAILY_TRIVIA } from '../localState/Queries';
import ScoresQuery from '../queries/Scores';

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import Modal from './Modal';
import { useAuth, usePrev } from '../hooks'

function GuessForm({ inputs, buttons, form, cb}) {
  const { data: { localTrivia } } = useQuery(DAILY_TRIVIA);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const prevModalOpen = usePrev(isOpen);
  const { loading: unguessedPlayersLoading, data: unguessedPlayersData, refetch: unguessedPlayersRefetch } = useQuery(UnguessedPlayers);
  const { loading: currentUserLoading, data: currentUserData } = useQuery(CurrentUserQuery);
  const { refetch: scoresRefetch } = useQuery(ScoresQuery);
  const [ guess, { data: guessData }] = useMutation(mutation);
  const { user } = useAuth();

  
  async function recordGuess(event, vals) {
    try {
      const { data: { guess: userGuess } } = await guess({
        variables: {
          userId: parseInt(vals.player),
          questionId: parseInt(localTrivia.questionId),
          questionChoiceId: parseInt(localTrivia.questionChoicesId),
          guess: localTrivia.questionChoices[vals.guess.toUpperCase().charCodeAt(0) - 65]        
        },
        refetchQueries: [{ query: UnguessedPlayers }]
      });
      // debugger

      toggleModal();
      setModalMessage(`You're Answer is...${ userGuess.isCorrect ?'CORRECT!' : 'WRONG! HAHA' }!`);
    } catch(err) {
      //TODO add error handling to guess mutation
      console.log(err)
      debugger
      toggleModal();
      setModalMessage(`There was an error! Try Again!`);
    }
  }

  useEffect( () => {
    // debugger
    if (prevModalOpen === true && isOpen === false) {
      (async () => {
        cb && cb();
        await unguessedPlayersRefetch();
        await scoresRefetch();
      })()

    }
  }, [isOpen])

  if (!user || unguessedPlayersLoading) return <div></div>;

  const toggleModal = e => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
      />
      <FormApp 
        form={form}
        onSubmit={recordGuess}
        inputs={inputs}
        validate={validate}
        buttons={buttons}
      />
    </React.Fragment>
  );
}

export default GuessForm;