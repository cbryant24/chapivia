import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useLastLocation } from 'react-router-last-location';

/// TESTING REDUX \\\
import { useDispatch } from 'react-redux';
/// TESTING REDUX \\\

import { useRequireAuth } from 'hooks';
import triviaQuery from 'queries/Trivia';

import Modal from 'components/Modal';
import { Div, H3 } from '@cbryant24/styled-react';

import Winner from 'components/Winner';
import GuessList from 'components/GuessList';
import Scoreboard from 'components/Scoreboard';
import TriviaQuestion from 'components/TriviaQuestion';

import { BorderPrimary, InfiniteCarousel } from './styledComponents';

const Game = (props) => {
	const { loading: triviaLoading, data: triviaData } = useQuery(triviaQuery);
	// const client = useApolloClient();
	const { user } = useRequireAuth();
	// const router = useRouter();
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (triviaLoading) return;

	// 	try {
	// 		client.writeData({
	// 			data: {
	// 				localTrivia: {
	// 					questionId: triviaData.dailyTrivia.id,
	// 					question: triviaData.dailyTrivia.question,
	// 					questionChoices: triviaData.dailyTrivia.triviaChoices.choices,
	// 					questionChoicesId: triviaData.dailyTrivia.triviaChoices.id,
	// 					category: triviaData.dailyTrivia.category,
	// 					__typename: 'dailyTrivia',
	// 				},
	// 			},
	// 		});
	// 	} catch (res) {
	// 		//TODO: add proper error handling
	// 		const errors =
	// 			res.graphQLErrors && res.graphQLErrors.length
	// 				? res.graphQLErrors
	// 				: 'There was an error getting trivia data check back laater';
	// 		toggleModal();
	// 		setModalMessage(errors);
	// 		return;
	// 	}
	// }, [triviaData]);

	if (triviaLoading || !user) return <div> </div>;

	dispatch({ type: 'SET_TRIVIA', payload: triviaData });

	function displayGame() {

		// const carouselActiveStyle = {
		// 	transform: 'translateX(5px)',
		// 	height: '7em',
		// 	width: '15em',
		// 	opacity: '1',
		// 	py: [1],
		// 	textAlign: 'center',
		// 	border: '3px solid red',
		// 	m: '1em',
		// 	display: 'flex',
		// 	justifyContent: 'center',
		// 	alignItems: 'center',
		// 	cursor: 'pointer',
		// };

		// const carouselInactiveStyle = {
		// 	...carouselActiveStyle,
		// 	pseudo: 'true',
		// 	transform: 'translateX(0px)',
		// 	opacity: '.5',
		// 	transition: '1s all',
		// 	hover: {
		// 		transform: 'translateY(-5px)',
		// 		visibility: 'visible',
		// 		opacity: '1',
		// 	},
		// };

		// const sharedArrowContainerStyle = {
		// 	position: 'absolute',
		// 	opacity: '.25',
		// 	cursor: 'pointer',
		// 	width: '3em',
		// 	height: '100%',
		// 	backgroundColor: 'primary',
		// 	padding: '5px 5px 6px 2px',
		// 	zIndex: [2],
		// };

		// const leftArrowContainerStyle = {
		// 	...sharedArrowContainerStyle,
		// 	left: '0%',
		// };

		// const rightArrowContainerStyle = {
		// 	...sharedArrowContainerStyle,
		// 	right: '0%',
		// };

		// const arrowStyle = {
		// 	arrowColor: 'white',
		// 	stroke: 'white',
		// 	strokeWidth: '50',
		// 	width: '3em',
		// 	height: '3em',
		// 	backgroundColor: 'primary',
		// 	padding: '5px 5px 6px 2px',
		// };

		// console.log("AM I RENDERING THE GAME!!");

		// return <div></div>;
		return (
			<InfiniteCarousel
				width="90vw"
				bp={500}
				carouselIndicator={true}
				carouselStyle={{
					themeStyle: 'carouselNormal',
				}}
				carouselIndicatorStyle={{
					width: [4],
					height: [1],
					backgroundColor: 'black',
					color: 'white',
					margin: [1],
				}}
				carouselIndicatorActiveStyle={{ themeStyle: 'carouselActiveStyle' }}
				carouselIndicatorInactiveStyle={{ themeStyle: 'carouselInactiveStyle' }}
				leftArrowContainerStyle={{ themeStyle: 'leftArrowContainerStyle' }}
				rightArrowContainerStyle={{ themeStyle: 'rightArrowContainerStyle' }}
				arrowStyle={{ themeStyle: 'arrowStyle' }}
				displayArrow={true}
				fromScale=".95"
				toScale="1"
			>
				<BorderPrimary
					mx="3em"
					height="100%"
					carouselIndicatorName="Guess List"
				>
					<GuessList />
				</BorderPrimary>
				<BorderPrimary
					mx="3em"
					height="100%"
					carouselIndicatorName="Trivia Question"
				>
					<TriviaQuestion />
				</BorderPrimary>
				<BorderPrimary
					mx="3em"
					height="100%"
					carouselIndicatorName="Scoreboard"
				>
					<Scoreboard />
				</BorderPrimary>
				<BorderPrimary mx="3em" height="100%" carouselIndicatorName="Winners">
					<Winner />
				</BorderPrimary>
			</InfiniteCarousel>
		);
	}

	return (
		<Div m={4} zIndex={2} width="100%">
			<H3 color="primary" themeStyle={['marginSmallY']} textAlign="center">
				Chapivia
			</H3>
			{displayGame()}
		</Div>
	);
};

// function mapStateToProps(state) {
// 	return {
// 		trivia: state.trivia,
// 	};
// }

// export default connect(mapStateToProps, { set_trivia })(Game);
export default Game;
