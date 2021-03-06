import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';

import { updateComponent, mocks, mockDispatchFn } from '__tests__/utils';
import GuessList from 'components/GuessList';
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
	};

async function initComponent(options) {
	const { mocks: componentMocks, state: componentState } = options,
		testMocks = [];
	let state = null;
	if (componentMocks) {
		componentMocks.map((mock) => testMocks.push(mocks[mock]));
	}

	if (componentState) {
		for (const stateProp in componentState) {
			if (componentState.hasOwnProperty(stateProp)) {
				state = {
					...state,
					stateProp,
				};
			}
		}
	}

	component = mount(
		<MockedProvider mocks={testMocks} addTypename={false}>
			<Root state={state}>
				<GuessList />
			</Root>
		</MockedProvider>
	);
}

describe('trivia guesses', () => {
	describe('trivia guesses', () => {
		beforeEach(async () => {
			initComponent({ mocks: ['LOGGED_IN_USER', 'GUESS_LIST'] });
			await updateComponent(component);
		});

		afterEach(() => component.unmount);

		describe('non-admin', () => {
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
		});

		describe('admin', () => {
			beforeEach(async () => {
				initComponent({
					mocks: [
						'LOGGED_IN_ADMIN',
						'GUESS_LIST',
						'CORRECT_GUESS_MUTATION',
						'SCORES_MOCK',
						'GUESS_LIST',
					],
				});

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			describe('form', () => {
				it('displays the admin view of guesses', () => {
					expect(
						component.find('#chapivia-player-guesslist li button').length
					).toBeGreaterThanOrEqual(3);
				});
			});

			describe('change users guess', () => {
				beforeEach(async () => {
					component
						.find('#chapivia-player-guesslist li button')
						.at(0)
						.simulate('click');

					await updateComponent(component);
				});

				afterEach(() => component.unmount);

				it('displays a form to change a users guess', async () => {
					expect(component.find('form').length).toEqual(1);

					expect(component.find('select option').length).toEqual(1);

					expect(component.find('select option').text()).toEqual('Kanye');
				});

				it('displays an error when using an invalid character', () => {
					component.find('input').simulate('change', INVALID_GUESS);

					expect(
						component.find('.styled-react-errors__guess li').length
					).toEqual(1);

					expect(
						component.find('.styled-react-errors__guess li p').text()
					).toEqual('Guess should only be A, B, C, D');
				});

				it('allows admins to change player guess to correct guess', async () => {
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

				describe('errors', () => {
					beforeEach(async () => {
						initComponent({
							mocks: [
								'LOGGED_IN_ADMIN',
								'GUESS_LIST',
								'INCORRECT_GUESS_MUTATION',
								'SCORES_MOCK',
								'GUESS_LIST',
							],
						});
						await updateComponent(component);
					});

					it('allows admins to change player guess to incorrect guess', async () => {
						component
							.find('#chapivia-player-guesslist li button')
							.at(0)
							.simulate('click');

						await updateComponent(component);
						component.find('input').simulate('change', VALID_INCORRECT_GUESS);

						component.find('form').simulate('submit');

						await updateComponent(component);

						expect(mockDispatchFn).toHaveBeenCalledWith({
							payload: {
								afterClose: expect.any(Function),
								message: "You're Answer is...WRONG! HAHA",
							},
							type: 'OPEN_MODAL',
						});
					});
				});
			});
		});
	});
});
