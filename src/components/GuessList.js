import React, { useState, Fragment } from 'react';

import { useQuery } from '@apollo/react-hooks';
import GuessListQuery from 'queries/GuessList';

import { useAuth } from 'hooks';

import GuessForm from 'components/GuessForm';

import { updateGuessFormData } from 'components/formData';
import { guessValidation } from 'components/validations';

import { Div, FlexDiv, P, Button, Ul, FlexLi } from '@cbryant24/styled-react';
import { LeftAlignText, RightAlignText } from 'components/styledComponents';

function GuessList(props) {
	const [selectedPlayer, setSelectedPlayer] = useState(null);
	const { loading: guessListLoading, data: guessListData, refetch } = useQuery(
		GuessListQuery
	);
	const { form, inputs, buttons } = updateGuessFormData;
	const { user } = useAuth();

	function handleChangeCancel() {
		setSelectedPlayer(null);
	}

	function displayGuessesNonAdmin() {
		return guessListData.guessedPlayers.map((guessedPlayer) => (
			<FlexLi
				textAlign="center"
				height="4rem"
				justifyContent="space-between"
				position="relative"
				key={guessedPlayer.id}
			>
				<LeftAlignText width={[2]}>{guessedPlayer.name}</LeftAlignText>
				<RightAlignText width={[2]}>
					{guessedPlayer.userQuestionChoices[0].isCorrect
						? 'Answered Correct!'
						: 'Answered Wrong!'}
				</RightAlignText>
			</FlexLi>
		));
	}

	async function refreshList() {
		await refetch();
		handleChangeCancel();
		return;
	}

	buttons.forEach((button) => {
		if (button.type === 'cancel') button.cb = handleChangeCancel;
	});

	inputs.forEach((input) =>
		input.data.type === 'select' && selectedPlayer
			? (input.data.inputData.options = [
				{ id: selectedPlayer.id, name: selectedPlayer.name },
			  ])
			: null
	);
	
	function dispalayGuesses() {
		if (guessListLoading || !user) return <Div></Div>;

		if (user.role !== 'admin') return <Div>{displayGuessesNonAdmin()}</Div>;

		return guessListData.guessedPlayers.map((guessedPlayer) => (
			<FlexLi
				textAlign="center"
				justifyContent="space-between"
				position="relative"
				mb="5px"
				key={guessedPlayer.id}
			>
				{selectedPlayer === guessedPlayer ? (
					<GuessForm
						form={form}
						inputs={inputs}
						buttons={buttons}
						validate={guessValidation}
						afterModalClose={refreshList}
						guessType="updateGuess"
					/>
				) : (
					<Fragment>
						<P width={[2]} textAlign="left">
							{guessedPlayer.name}
						</P>
						<P width={[3]} textAlign="left">
							{guessedPlayer.userQuestionChoices[0].isCorrect
								? 'Answered Correct!'
								: 'Answered Wrong!'}
						</P>
						<Button
							onClick={() => setSelectedPlayer(guessedPlayer)}
							themeStyle={['squareButton']}
						>
							change
						</Button>
					</Fragment>
				)}
			</FlexLi>
		));
	}
	return (
		<FlexDiv
			display="flex"
			flexDirection="column"
			minWidth="50%"
			height="auto"
			fontSizeModule={[1]}
		>
			<P fontSize={[3]} textAlign="center" themeStyle={['marginBottomMedium']}>
				Todays Guesses
			</P>
			<Ul id="chapivia-player-guesslist">{dispalayGuesses()}</Ul>
		</FlexDiv>
	);
}

export default GuessList;
