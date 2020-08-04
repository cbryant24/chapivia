import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

import mutation from 'mutations/Guess';
import UnguessedPlayers from 'queries/UnguessedPlayers';
import GuessList from 'queries/GuessList';
import Scores from 'queries/Scores';

import Form from '@cbryant24/styled-react-form';
import { guessValidation } from 'components/validations';

// import Modal from 'components/Modal';
import { usePrev } from 'hooks';
// import { openModalAction } from 'actions';
import types from 'actions/types';

function GuessForm({ inputs, buttons, form, cb, afterModalClose, guessType }) {
	// const {
	// 	data: { localTrivia },
	// } = useQuery(DAILY_TRIVIA);
	const {
		trivia: { dailyTrivia },
		modal,
	} = useSelector((state) => state);
	// const [isOpen, setIsOpen] = useState(false);
	// const [modalMessage, setModalMessage] = useState('');
	const prevModalOpen = usePrev(modal.isOpen);
	const { refetch: unguessedPlayersRefetch } = useQuery(UnguessedPlayers);
	const { refetch: scoresRefetch } = useQuery(Scores);
	const { refetch: guessListRefetch } = useQuery(GuessList);
	const [guess] = useMutation(mutation);
	const dispatch = useDispatch();

	async function recordGuess(event, vals) {
		if (isNaN(vals.player) || vals.player === '') {
			dispatch({
				type: types.OPEN_MODAL,
				payload: {
					message: 'You must select a player!',
				}
			});
			return;
		}

		try {
			const {
				data: { guess: userGuess },
			} = await guess({
				variables: {
					userId: parseInt(vals.player),
					questionId: parseInt(dailyTrivia.id),
					questionChoiceId: parseInt(dailyTrivia.triviaChoices.id),
					guess:
						dailyTrivia.triviaChoices.choices[
							vals.guess.toUpperCase().charCodeAt(0) - 65
						],
				},
			});

			dispatch({
				type: types.OPEN_MODAL,
				payload: {
					message: `You're Answer is...${
						userGuess.isCorrect ? 'CORRECT!' : 'WRONG! HAHA'
					}`,
					afterClose: refetchData,
				},
			});
		} catch (err) {
			//TODO add error handling to guess mutation
			dispatch({
				type: types.OPEN_MODAL,
				payload: {
					message: `There was an error! If Error continues please contact admin`,
				},
			});
		}
	}

	useEffect(() => {
		if (prevModalOpen === true && modal.isOpen === false) {
			(() => {
				cb && cb();
			})();
		}
	}, [modal.isOpen]);

	async function refetchData() {
		switch (guessType) {
		case 'adminGuess':
			await scoresRefetch();
			await guessListRefetch();
			await unguessedPlayersRefetch();
			break;
		case 'updateGuess':
			await scoresRefetch();
			break;
		case 'newGuess':
			await scoresRefetch();
			await guessListRefetch();
			break;
		default:
			break;
		}

		afterModalClose && afterModalClose();
	}

	return (
		<React.Fragment>
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
