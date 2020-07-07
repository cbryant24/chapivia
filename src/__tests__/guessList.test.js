import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import 'jest-styled-components';

import Root from 'Root';

import { updateComponent } from 'utils/test/functions';
import { GUESS_LIST, LOGGED_IN_USER, LOGGED_IN_ADMIN, LOCAL_TRIVIA } from 'utils/test/mocks';
import Game from 'components/Game';
import Login from 'components/Login';
import GuessList from 'components/GuessList';
import { AllHtmlEntities as Entities } from 'html-entities';


import typeDefs from 'localState/typeDefs';
import ApolloClient from 'apollo-boost';



const client = new ApolloClient({
	uri: '/graphql',
});

let component, appHistory, appLocation;


const VALID_INCORRECT_GUESS = {
		target: { value: 'B', name: 'guess' },
	},
	VALID_CORRECT_GUESS = {
		target: { value: 'D', name: 'guess' },
	},
	INVALID_GUESS = {
		target: { value: 'K', name: 'guess' },
	},
	SELECT_VALID_PLAYER = {
		target: { value: '0', name: 'player' },
	};

describe('trivia guesses', () => {
	// beforeEach(async () => {
	// 	component = mount(
	// 		<MockedProvider mocks={[LOGGED_IN_USER, GUESS_LIST]} addTypename={false}>
	// 			<Root>
	// 				<GuessList />
	// 			</Root>
	// 		</MockedProvider>
	// 	);

	// 	await updateComponent(component);
	// });

	// it('displays all player guesses', () => {
	// 	expect(
	// 		component.find('#chapivia-player-guesslist li').length
	// 	).toBeGreaterThanOrEqual(3);
	// });

	// it('does not allow a non admin to change guesses', () => {
	// 	expect(
	// 		component.find('#chapivia-player-guesslist li button').length
	// 	).toEqual(0);
	// });

	describe('admin', () => {
		beforeEach(async () => {
			const cache = {
				clientState: {
					defaults: {
						localTrivia: {
							questionId: null,
							question: '',
							questionChoices: [],
							questionChoicesId: null,
							__typename: 'dailyTrivia',
						},
					},
					resolvers: {},
					typeDefs,
				},
			}
			component = mount(
				<MockedProvider
					mocks={[LOGGED_IN_ADMIN, GUESS_LIST]}
					addTypename={false}
					// cache={cache}
					// client={client}
				>
					<Root>
						<GuessList />
					</Root>
				</MockedProvider>
			);

			await updateComponent(component);
		});

		it('allows admins to change player guesses', async () => {
			expect(
				component.find('#chapivia-player-guesslist li button').length
			).toBeGreaterThanOrEqual(3);
			await updateComponent(component,30);

			component
				.find('#chapivia-player-guesslist li button')
				.at(1)
				.simulate('click');

			await updateComponent(component, 30);

			expect(component.debug()).toEqual(0);
		});
	});
});
