import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import mutation from '../mutations/Guess';
import UnguessedPlayers from '../queries/UnguessedPlayers';
import GuessList from '../queries/GuessList';
import Scores from '../queries/Scores';

import { DAILY_TRIVIA } from '../localState/Queries';

import Form from '@cbryant24/styled-react-form';
import { guessValidation } from './validations';

import Modal from './Modal';
import { usePrev } from '../hooks';

function GuessForm({ inputs, buttons, form, cb, afterModalClose }) {
  const {
    data: { localTrivia }
  } = useQuery(DAILY_TRIVIA);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const prevModalOpen = usePrev(isOpen);
  const { refetch: unguessedPlayersRefetch } = useQuery(UnguessedPlayers);
  const { refetch: scoresRefetch } = useQuery(Scores);
  const { refetch: guessListRefetch } = useQuery(GuessList);
  const [guess] = useMutation(mutation);
  //const [{ currentSlide }, dispatch] = useStateValue();
  // debugger;
  async function recordGuess(event, vals) {
    try {
      const {
        data: { guess: userGuess }
      } = await guess({
        variables: {
          userId: parseInt(vals.player),
          questionId: parseInt(localTrivia.questionId),
          questionChoiceId: parseInt(localTrivia.questionChoicesId),
          guess:
            localTrivia.questionChoices[
              vals.guess.toUpperCase().charCodeAt(0) - 65
            ]
        }
        // refetchQueries: [{ query: UnguessedPlayers }, { query: guessList }]
      });

      toggleModal();
      setModalMessage(
        `You're Answer is...${userGuess.isCorrect ? 'CORRECT!' : 'WRONG! HAHA'}`
      );
    } catch (err) {
      //TODO add error handling to guess mutation
      console.log(err);
      toggleModal();
      setModalMessage(`There was an error! Try Again!`);
    }
  }

  useEffect(() => {
    if (prevModalOpen === true && isOpen === false) {
      (() => {
        cb && cb();
      })();
    }
  }, [isOpen]);

  async function refetchData() {
    await unguessedPlayersRefetch();
    await scoresRefetch();
    await guessListRefetch();
    afterModalClose && afterModalClose();
  }

  const toggleModal = e => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        modalMessage={modalMessage}
        toggleModal={toggleModal}
        afterClose={refetchData}
      />
      <Form
        form={form}
        onSubmit={recordGuess}
        inputs={inputs}
        validate={guessValidation}
        buttons={buttons}
      />
    </React.Fragment>
  );
}

export default GuessForm;
