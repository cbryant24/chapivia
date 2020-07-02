// import React from 'react';
// import { MockedProvider } from '@apollo/react-testing';
// import { mount } from 'enzyme';
// import { MemoryRouter, Route } from 'react-router';
// import 'jest-styled-components';

// import Root from 'Root';

// import { updateComponent } from 'utils/test/functions';
// import {
// 	LOGGED_OUT_USER,
// 	LOGGED_IN_USER,
// 	LOCAL_TRIVIA,
// 	UNGUESSED_PLAYER,
// 	UNGUESSED_PLAYERS,
// 	LOGGED_IN_ADMIN,
// 	EMPTY_UNGUESSED_PLAYERS,
// 	INCORRECT_GUESS_MUTATION,
// 	CORRECT_GUESS_MUTATION,
// } from 'utils/test/mocks';
// import Game from 'components/Game';
// import Login from 'components/Login';
// import TriviaQuestion from 'components/TriviaQuestion';
// import { AllHtmlEntities as Entities } from 'html-entities';

// let component, appHistory, appLocation;

// const VALID_INCORRECT_GUESS = {
// 		target: { value: 'B', name: 'guess' },
// 	},
// 	VALID_CORRECT_GUESS = {
// 		target: { value: 'D', name: 'guess' },
// 	},
// 	INVALID_GUESS = {
// 		target: { value: 'K', name: 'guess' },
// 	},
// 	SELECT_VALID_PLAYER = {
// 		target: { value: '0', name: 'player'},
// 	};

// describe('trivia guess', () => {
// 	beforeEach(async () => {
// 		component = mount(
// 			<MockedProvider
// 				mocks={[LOGGED_IN_USER, LOCAL_TRIVIA, UNGUESSED_PLAYER]}
// 				addTypename={false}
// 			>
// 				<MemoryRouter initialEntries={[{ pathname: '/game' }]}>
// 					<Route
// 						path="*"
// 						render={({ history, location }) => {
// 							appHistory = history;
// 							appLocation = location;
// 							return null;
// 						}}
// 					/>
// 					<Root>
// 						<TriviaQuestion />
// 					</Root>
// 				</MemoryRouter>
// 			</MockedProvider>
// 		);

// 		await updateComponent(component);
// 	});

// 	describe('trivia display', () => {
// 		const entities = new Entities();

// 		it('displays the trivia question', () => {
// 			expect(component.text().includes('Minnesota')).toBe(true);
// 			expect(component.text().includes('Washington')).toBe(true);
// 			expect(component.text().includes('California')).toBe(true);
// 			expect(component.text().includes('San Francisco')).toBe(true);
// 			expect(
// 				component
// 					.text()
// 					.includes(
// 						entities.decode(
// 							'Which city did Anger berate for ruining pizza in &quot;Inside Out&quot;?'
// 						)
// 					)
// 			).toBe(true);
// 		});
// 	});

// 	describe('non-admin', () => {
// 		describe('trivia guess form', () => {
// 			it('displays only the current players name for guess in select', () => {
// 				expect(component.find('select').length).toEqual(1);
// 				expect(component.find('select').text()).toEqual('Kanye');
// 				expect(component.find('select option').props().value).toEqual(0);
// 			});

// 			it('has an input form for entering user guess', () => {
// 				expect(component.find('input').length).toEqual(1);
// 			});

// 			it('allows a user to enter A, B, C, D characters', () => {
// 				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

// 				expect(component.find('input').instance().value).toEqual('B');
// 			});

// 			it('displays an error when using an invalid character', () => {
// 				component.find('input').simulate('change', INVALID_GUESS);

// 				expect(component.find('.styled-react-errors__guess li').length).toEqual(
// 					1
// 				);

// 				expect(
// 					component.find('.styled-react-errors__guess li p').text()
// 				).toEqual('Guess should only be A, B, C, D');
// 			});
// 		});

// 		describe('incorrect trivia guess', () => {
// 			beforeEach(async () => {
// 				component = mount(
// 					<MockedProvider
// 						mocks={[
// 							LOGGED_IN_USER,
// 							LOCAL_TRIVIA,
// 							UNGUESSED_PLAYER,
// 							INCORRECT_GUESS_MUTATION,
// 						]}
// 						addTypename={false}
// 					>
// 						<Root>
// 							<TriviaQuestion />
// 						</Root>
// 					</MockedProvider>
// 				);

// 				await updateComponent(component);
// 			});

// 			afterEach(() => component.unmount());

// 			it('records a users incorrect guess', async () => {
// 				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

// 				component.find('form').simulate('submit');

// 				await updateComponent(component);

// 				expect(component.find('#chapivia-modal p').text()).toEqual(
// 					'You\'re Answer is...WRONG! HAHA'
// 				);
// 			});
// 		});

// 		describe('correct trivia guess', () => {
// 			beforeEach(async () => {
// 				component = mount(
// 					<MockedProvider
// 						mocks={[
// 							LOGGED_IN_USER,
// 							LOCAL_TRIVIA,
// 							UNGUESSED_PLAYER,
// 							CORRECT_GUESS_MUTATION,
// 						]}
// 						addTypename={false}
// 					>
// 						<Root>
// 							<TriviaQuestion />
// 						</Root>
// 					</MockedProvider>
// 				);

// 				await updateComponent(component);
// 			});

// 			afterEach(() => component.unmount());

// 			it('records a users incorrect guess', async () => {
// 				component.find('input').simulate('change', VALID_CORRECT_GUESS);

// 				component.find('form').simulate('submit');

// 				await updateComponent(component);

// 				expect(component.find('#chapivia-modal p').text()).toEqual(
// 					'You\'re Answer is...CORRECT!'
// 				);
// 			});
// 		});

// 		describe('user already guessed', () => {
// 			beforeEach(async () => {
// 				component = mount(
// 					<MockedProvider
// 						mocks={[
// 							LOGGED_IN_USER,
// 							LOCAL_TRIVIA,
// 							EMPTY_UNGUESSED_PLAYERS,
// 							CORRECT_GUESS_MUTATION,
// 						]}
// 						addTypename={false}
// 					>
// 						<Root>
// 							<TriviaQuestion />
// 						</Root>
// 					</MockedProvider>
// 				);

// 				await updateComponent(component);
// 			});

// 			afterEach(() => component.unmount());

// 			it('displays the user has already guessed', () => {
// 				expect(component.find('small').text()).toEqual('you have already guessed! contact admin to ahange your answer.');
// 			});
// 		});
// 	});

// 	describe('admin', () => {
// 		beforeEach(async () => {
// 			component = mount(
// 				<MockedProvider
// 					mocks={[LOGGED_IN_ADMIN, LOCAL_TRIVIA, UNGUESSED_PLAYERS]}
// 					addTypename={false}
// 				>
// 					<MemoryRouter initialEntries={[{ pathname: '/game' }]}>
// 						<Route
// 							path="*"
// 							render={({ history, location }) => {
// 								appHistory = history;
// 								appLocation = location;
// 								return null;
// 							}}
// 						/>
// 						<Root>
// 							<TriviaQuestion />
// 						</Root>
// 					</MemoryRouter>
// 				</MockedProvider>
// 			);
// 			await updateComponent(component);
// 		});
// 		describe('trivia guess form', () => {
// 			it('displays all unguessed players name for guess in select', () => {
// 				expect(component.find('select').length).toEqual(1);
// 				expect(component.find('select').text()).toContain('Kanye');
// 				expect(component.find('select option').length).toBeGreaterThanOrEqual(3);
// 			});

// 			it('has an input form for entering user guess', () => {
// 				expect(component.find('input').length).toEqual(1);
// 			});

// 			it('allows a user to enter A, B, C, D characters', () => {
// 				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

// 				expect(component.find('input').instance().value).toEqual('B');
// 			});

// 			it('displays an error when using an invalid character', () => {
// 				component.find('input').simulate('change', INVALID_GUESS);

// 				expect(component.find('.styled-react-errors__guess li').length).toEqual(
// 					1
// 				);

// 				expect(
// 					component.find('.styled-react-errors__guess li p').text()
// 				).toEqual('Guess should only be A, B, C, D');
// 			});

// 			it('does not allow to submit with an empty user', async () => {
// 				component.find('input').simulate('change', VALID_CORRECT_GUESS);

// 				component.find('form').simulate('submit');

// 				await updateComponent(component);

// 				expect(component.find('#chapivia-modal p').text()).toEqual('You must select a player!');
// 			});
// 		});

// 		describe('incorrect trivia guess', () => {
// 			beforeEach(async () => {
// 				component = mount(
// 					<MockedProvider
// 						mocks={[
// 							LOGGED_IN_ADMIN,
// 							LOCAL_TRIVIA,
// 							UNGUESSED_PLAYERS,
// 							INCORRECT_GUESS_MUTATION,
// 						]}
// 						addTypename={false}
// 					>
// 						<Root>
// 							<TriviaQuestion />
// 						</Root>
// 					</MockedProvider>
// 				);

// 				await updateComponent(component);
// 			});

// 			afterEach(() => component.unmount());

// 			it('records a users incorrect guess', async () => {
// 				component.find('input').simulate('change', VALID_INCORRECT_GUESS);

// 				component.find('select').simulate('change', SELECT_VALID_PLAYER);

// 				component.find('form').simulate('submit');

// 				await updateComponent(component, 20);

// 				expect(component.find('#chapivia-modal p').text()).toEqual(
// 					'You\'re Answer is...WRONG! HAHA'
// 				);
// 			});
// 		});

// 		describe('correct trivia guess', () => {
// 			beforeEach(async () => {
// 				component = mount(
// 					<MockedProvider
// 						mocks={[
// 							LOGGED_IN_ADMIN,
// 							LOCAL_TRIVIA,
// 							UNGUESSED_PLAYERS,
// 							CORRECT_GUESS_MUTATION,
// 						]}
// 						addTypename={false}
// 					>
// 						<Root>
// 							<TriviaQuestion />
// 						</Root>
// 					</MockedProvider>
// 				);

// 				await updateComponent(component);
// 			});

// 			afterEach(() => component.unmount());

// 			it('records a users incorrect guess', async () => {
// 				component.find('input').simulate('change', VALID_CORRECT_GUESS);

// 				component.find('select').simulate('change', SELECT_VALID_PLAYER);

// 				component.find('form').simulate('submit');

// 				await updateComponent(component);

// 				expect(component.find('#chapivia-modal p').text()).toEqual(
// 					'You\'re Answer is...CORRECT!'
// 				);
// 			});
// 		});
// 	});

// 	describe('logged out user', () => {
// 		beforeEach(async () => {
// 			component = mount(
// 				<MockedProvider
// 					mocks={[LOGGED_OUT_USER, LOCAL_TRIVIA, EMPTY_UNGUESSED_PLAYERS]}
// 					addTypename={false}
// 				>
// 					<MemoryRouter initialEntries={['/game']}>
// 						<Root>
// 							<Route
// 								path="/"
// 								render={({history, location}) => {
// 									appHistory = history;
// 									appLocation = location;

// 									return <Login/>;
// 								}}
// 							/>
// 							<Route
// 								path="/game"
// 								render={({ history, location }) => {
// 									appHistory = history;
// 									appLocation = location;
// 									return <Game />;
// 								}}
// 							/>
// 						</Root>
// 					</MemoryRouter>
// 				</MockedProvider>
// 			);

// 			await updateComponent(component);
// 		});

// 		afterEach(() => component.unmount());

// 		it('redirects the user when not logged in', () => {
// 			expect(appHistory.location.pathname).toBe('/');
// 		});
// 	});
// });
