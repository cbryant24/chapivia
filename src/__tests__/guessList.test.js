import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import reducer from 'reducers/trivia';

import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import 'jest-styled-components';

import Root from 'Root';

import { updateComponent } from 'utils/test/functions';
import {
	GUESS_LIST,
	LOGGED_IN_USER,
	LOGGED_IN_ADMIN,
	CORRECT_GUESS_MUTATION,
	SCORES_MOCK,
} from 'utils/test/mocks';
import { state } from 'utils/test/data';
import GuessList from 'components/GuessList';

let component, appHistory, appLocation;

const mockStore = createStore(reducer, state);

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
	beforeEach(async () => {
		component = mount(
			<MockedProvider mocks={[LOGGED_IN_USER, GUESS_LIST]} addTypename={false}>
				<Root>
					<GuessList />
				</Root>
			</MockedProvider>
		);

		await updateComponent(component);
	});

	it('displays all player guesses', () => {
		expect(
			component.find('#chapivia-player-guesslist li').length
		).toBeGreaterThanOrEqual(3);
	});

	it('does not allow a non admin to change guesses', () => {
		expect(
			component.find('#chapivia-player-guesslist li button').length
		).toEqual(0);
	});

	describe('admin', () => {
		beforeEach(async () => {
			component = mount(
				<MockedProvider
					mocks={[
						LOGGED_IN_ADMIN,
						GUESS_LIST,
						CORRECT_GUESS_MUTATION,
						SCORES_MOCK,
						SCORES_MOCK,
						GUESS_LIST,
					]}
					addTypename={false}
				>
					<Provider store={mockStore}>
						<Root>
							<GuessList />
						</Root>
					</Provider>
				</MockedProvider>
			);

			await updateComponent(component);
		});

		describe('form', () => {
			it('allows admins to change player guesses', async () => {
				expect(
					component.find('#chapivia-player-guesslist li button').length
				).toBeGreaterThanOrEqual(3);
				await updateComponent(component, 30);

				component
					.find('#chapivia-player-guesslist li button')
					.at(0)
					.simulate('click');

				await updateComponent(component, 30);

				expect(component.find('form').length).toEqual(1);

				expect(component.find('select option').length).toEqual(1);

				expect(component.find('select option').text()).toEqual('Kanye');

				component.find('input').simulate('change', VALID_CORRECT_GUESS);

				component.find('form').simulate('submit');

				await updateComponent(component);

				expect(component.find('#chapivia-modal p').text()).toEqual(
					'You\'re Answer is...CORRECT!'
				);

				component.find('#chapivia-modal button').simulate('click');

				await updateComponent(component, 5);

				expect(component.find('#chapivia-modal').length).toEqual(0);
			});
		});
	});
});
