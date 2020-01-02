import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import guessList from '../queries/GuessList';

import mutation from '../mutations/Guess';
import UnguessedPlayers from '../queries/UnguessedPlayers';
import { DAILY_TRIVIA } from '../localState/Queries';
import ScoresQuery from '../queries/Scores';

import FormApp from './Form/App';
import { validate } from './helpers/validators';

import Modal from './Modal';
import { usePrev } from '../hooks'

function GuessForm({ inputs, buttons, form, cb}) {
  const { data: { localTrivia } }             = useQuery(DAILY_TRIVIA);
  const [isOpen, setIsOpen]                   = useState(false);
  const [modalMessage, setModalMessage]       = useState('');
  const prevModalOpen                         = usePrev(isOpen);
  const { refetch: unguessedPlayersRefetch }  = useQuery(UnguessedPlayers);
  const { refetch: scoresRefetch }            = useQuery(ScoresQuery);
  const [ guess ]                             = useMutation(mutation);
  
  async function recordGuess(event, vals) {
    try {
      const { data: { guess: userGuess } } = await guess({
        variables: {
          userId: parseInt(vals.player),
          questionId: parseInt(localTrivia.questionId),
          questionChoiceId: parseInt(localTrivia.questionChoicesId),
          guess: localTrivia.questionChoices[vals.guess.toUpperCase().charCodeAt(0) - 65]        
        },
        refetchQueries: [{ query: UnguessedPlayers }, { query: guessList}]
      });

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
    if (prevModalOpen === true && isOpen === false) {
      (async () => {
        cb && cb();
        await unguessedPlayersRefetch();
        await scoresRefetch();
      })()

    }
  }, [isOpen])

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