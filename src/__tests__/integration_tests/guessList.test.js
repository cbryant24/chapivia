import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import 'jest-styled-components';

import { updateComponent, mocks, mockDispatchFn } from '__tests__/utils';
import GuessList from 'components/GuessList';
import Modal from 'components/Modal';
import Root from '__tests__/utils/Root';

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
	describe('trivia guesses', () => {
		beforeEach(async () => {
			component = mount(
				<MockedProvider
					mocks={[mocks.LOGGED_IN_USER, mocks.GUESS_LIST]}
					addTypename={false}
				>
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
							mocks.LOGGED_IN_ADMIN,
							mocks.GUESS_LIST,
							mocks.CORRECT_GUESS_MUTATION,
							mocks.SCORES_MOCK,
							mocks.SCORES_MOCK,
							mocks.GUESS_LIST,
						]}
						addTypename={false}
					>
						<Root>
							<GuessList />
							<Modal />
						</Root>
					</MockedProvider>
				);

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			describe('form', () => {
				it('allows admins to change player guesses', async () => {
					expect(
						component.find('#chapivia-player-guesslist li button').length
					).toBeGreaterThanOrEqual(3);

					component
						.find('#chapivia-player-guesslist li button')
						.at(0)
						.simulate('click');

					expect(component.find('form').length).toEqual(1);

					expect(component.find('select option').length).toEqual(1);

					expect(component.find('select option').text()).toEqual('Kanye');

					component.find('input').simulate('change', VALID_CORRECT_GUESS);

					component.find('form').simulate('submit');

					await updateComponent(component);

					expect(mockDispatchFn).toHaveBeenCalledWith({
						payload: {
							afterClose: expect.any(Function),
							message: "You're Answer is...CORRECT!",
						},
						type: 'OPEN_MODAL',
					});
				});
			});
		});
	});
});
