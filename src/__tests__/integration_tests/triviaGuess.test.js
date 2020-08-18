import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import 'jest-styled-components';

import Root from '__tests__/utils/Root';

import { updateComponent, mocks, mockDispatchFn } from '__tests__/utils';

import Game from 'components/Game';
import Login from 'components/Login';
import TriviaQuestion from 'components/TriviaQuestion';
import { AllHtmlEntities as Entities } from 'html-entities';

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

async function initComponent(options) {
	const { mocks: componentMocks, state: componentState, path } = options,
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

	if (path) {
		component = mount(
			<MockedProvider mocks={testMocks} addTypename={false}>
				<MemoryRouter initialEntries={['/game']}>
					<Root>
						<Route
							path="/"
							render={({ history, location }) => {
								appHistory = history;
								appLocation = location;

								return <Login />;
							}}
						/>
						<Route
							path={path}
							render={({ history, location }) => {
								appHistory = history;
								appLocation = location;
								return <Game />;
							}}
						/>
					</Root>
				</MemoryRouter>
			</MockedProvider>
		);
		return;
	}

	component = mount(
		<MockedProvider mocks={testMocks} addTypename={false}>
			<MemoryRouter initialEntries={[{ pathname: ['/game'] }]}>
				<Route
					path="*"
					render={({ history, location }) => {
						appHistory = history;
						appLocation = location;
						return null;
					}}
				/>
				<Root state={state}>
					<TriviaQuestion />
				</Root>
			</MemoryRouter>
		</MockedProvider>
	);
}

describe('trivia guess', () => {
	beforeEach(async () => {
		initComponent({ mocks: ['LOGGED_IN_USER', 'UNGUESSED_PLAYER'] });

		await updateComponent(component);
	});

	describe('trivia display', () => {
		const entities = new Entities();

		it('displays the trivia question', () => {
			expect(component.text().includes('Minnesota')).toBe(true);
			expect(component.text().includes('Washington')).toBe(true);
			expect(component.text().includes('California')).toBe(true);
			expect(component.text().includes('San Francisco')).toBe(true);
			expect(
				component
					.text()
					.includes(
						entities.decode(
							'Which city did Anger berate for ruining pizza in &quot;Inside Out&quot;?'
						)
					)
			).toBe(true);
		});
	});

	describe('non-admin', () => {
		describe('trivia guess form', () => {
			it('displays only the current players name for guess in select', () => {
				expect(component.find('select').length).toEqual(1);
				expect(component.find('select').text()).toEqual('Kanye');
				expect(component.find('select option').props().value).toEqual(0);
			});

			it('has an input form for entering user guess', () => {
				expect(component.find('input').length).toEqual(1);
			});

			it('allows a user to enter A, B, C, D characters', () => {
				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

				expect(component.find('input').instance().value).toEqual('B');
			});

			it('displays an error when using an invalid character', () => {
				component.find('input').simulate('change', INVALID_GUESS);

				expect(component.find('.styled-react-errors__guess li').length).toEqual(
					1
				);

				expect(
					component.find('.styled-react-errors__guess li p').text()
				).toEqual('Guess should only be A, B, C, D');
			});
		});

		describe('incorrect trivia guess', () => {
			beforeEach(async () => {
				initComponent({
					mocks: [
						'LOGGED_IN_USER',
						'UNGUESSED_PLAYER',
						'INCORRECT_GUESS_MUTATION',
					],
				});

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			it('records a users incorrect guess', async () => {
				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

				component.find('form').simulate('submit');

				await updateComponent(component);

				expect(mockDispatchFn).toHaveBeenCalledWith({
					payload: {
						afterClose: expect.any(Function),
						message: 'You\'re Answer is...WRONG! HAHA',
					},
					type: 'OPEN_MODAL',
				});
			});
		});

		describe('correct trivia guess', () => {
			beforeEach(async () => {
				initComponent({
					mocks: [
						'LOGGED_IN_USER',
						'UNGUESSED_PLAYER',
						'CORRECT_GUESS_MUTATION',
					],
				});

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			it('records a users incorrect guess', async () => {
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

		describe('user already guessed', () => {
			beforeEach(async () => {
				initComponent({
					mocks: ['LOGGED_IN_USER', 'EMPTY_UNGUESSED_PLAYERS', 'CORRECT_GUESS_MUTATION']
				});

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			it('displays the user has already guessed', () => {
				expect(component.find('small').text()).toEqual(
					'you have already guessed! contact admin to ahange your answer.'
				);
			});
		});
	});

	describe('admin', () => {
		beforeEach(async () => {
			initComponent({
				mocks: ['LOGGED_IN_ADMIN', 'UNGUESSED_PLAYERS'],
			});

			await updateComponent(component);
		});

		describe('trivia guess form', () => {
			it('displays all unguessed players name for guess in select', () => {
				expect(component.find('select').length).toEqual(1);
				expect(component.find('select').text()).toContain('Kanye');
				expect(component.find('select option').length).toBeGreaterThanOrEqual(
					3
				);
			});

			it('has an input form for entering user guess', () => {
				expect(component.find('input').length).toEqual(1);
			});

			it('allows a user to enter A, B, C, D characters', () => {
				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

				expect(component.find('input').instance().value).toEqual('B');
			});

			it('displays an error when using an invalid character', () => {
				component.find('input').simulate('change', INVALID_GUESS);

				expect(component.find('.styled-react-errors__guess li').length).toEqual(
					1
				);

				expect(
					component.find('.styled-react-errors__guess li p').text()
				).toEqual('Guess should only be A, B, C, D');
			});

			it('does not allow to submit with an empty user', async () => {
				component.find('input').simulate('change', VALID_CORRECT_GUESS);

				component.find('form').simulate('submit');

				await updateComponent(component);

				expect(mockDispatchFn).toHaveBeenCalledWith({
					payload: {
						message: 'You must select a player!',
					},
					type: 'OPEN_MODAL',
				});
			});
		});

		describe('incorrect trivia guess', () => {
			beforeEach(async () => {
				initComponent({
					mocks: [
						'LOGGED_IN_ADMIN',
						'UNGUESSED_PLAYERS',
						'INCORRECT_GUESS_MUTATION',
					],
				});

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			it('records a users incorrect guess', async () => {
				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

				component.find('select').simulate('change', SELECT_VALID_PLAYER);

				component.find('form').simulate('submit');

				await updateComponent(component);

				expect(mockDispatchFn).toHaveBeenCalledWith({
					payload: {
						afterClose: expect.any(Function),
						message: 'You\'re Answer is...WRONG! HAHA',
					},
					type: 'OPEN_MODAL',
				});
			});
		});

		describe('correct trivia guess', () => {
			beforeEach(async () => {
				initComponent({
					mocks: [
						'LOGGED_IN_ADMIN',
						'UNGUESSED_PLAYERS',
						'CORRECT_GUESS_MUTATION',
					],
				});

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			it('records a users incorrect guess', async () => {
				component.find('input').simulate('change', VALID_CORRECT_GUESS);

				component.find('select').simulate('change', SELECT_VALID_PLAYER);

				component.find('form').simulate('submit');

				await updateComponent(component);

				expect(mockDispatchFn).toHaveBeenCalledWith({
					payload: {
						afterClose: expect.any(Function),
						message: 'You\'re Answer is...CORRECT!',
					},
					type: 'OPEN_MODAL',
				});
			});
		});
	});

	describe('logged out user', () => {
		beforeEach(async () => {
			initComponent({
				mocks: ['LOGGED_OUT_USER', 'EMPTY_UNGUESSED_PLAYERS'],
				path: '/game',
			});

			await updateComponent(component);
		});

		afterEach(() => component.unmount());

		it('redirects the user when not logged in', () => {
			expect(appHistory.location.pathname).toBe('/');
		});
	});
});
