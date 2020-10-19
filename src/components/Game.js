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
	const { user } = useRequireAuth();
	const dispatch = useDispatch();

	if (triviaLoading || !user) return <div> </div>;

	dispatch({ type: 'SET_TRIVIA', payload: triviaData });

	function displayGame() {

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

export default Game;
