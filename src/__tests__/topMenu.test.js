import React from 'react';
import TopMenu from 'components/TopMenu';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';

// REDUX
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'reducers/trivia';
import { state } from 'utils/test/data';

import {
	LOGGED_OUT_USER,
	SCORES_MOCK,
	LOGGED_IN_USER,
	LOGOUT_MUTATION,
} from 'utils/test/mocks';
import { updateComponent } from 'utils/test/functions';

import Root from 'Root';

const emptyMockStore = createStore(reducer, {});
const mockStore = createStore(reducer, state);

describe('top menu', () => {
	let component;

	describe('logged out', () => {
		describe('login page', () => {
			beforeEach(async () => {
				component = mount(
					<MockedProvider
						mocks={[LOGGED_OUT_USER, SCORES_MOCK]}
						addTypename={false}
					>
						<Provider store={emptyMockStore}>
							<MemoryRouter initialEntries={['/']}>
								<Root>
									<TopMenu />
								</Root>
							</MemoryRouter>
						</Provider>
					</MockedProvider>
				);

				await updateComponent(component);
			});

			it('displays a link to signup', () => {
				expect(component.find('a[href="/register"]').length).toEqual(1);
			});

			it('displays a blank trivia category', () => {
				expect(component.find('p.trivia-topic').text()).toEqual('');
			});

			it('displays a high score', () => {
				expect(component.find('p.hi-score').text()).toEqual('50,000');
			});
		});

		describe('signup page', () => {
			beforeEach(async () => {
				component = mount(
					<MockedProvider
						mocks={[LOGGED_OUT_USER, SCORES_MOCK]}
						addTypename={false}
					>
						<Provider store={emptyMockStore}>
							<MemoryRouter initialEntries={[{ pathname: '/register' }]}>
								<Root>
									<TopMenu />
								</Root>
							</MemoryRouter>
						</Provider>
					</MockedProvider>
				);

				await updateComponent(component);
			});

			it('displays link to login', () => {
				expect(component.find('a[href="/"]').length).toEqual(1);
			});

			it('displays a blank trivia category', () => {
				expect(component.find('p.trivia-topic').text()).toEqual('');
			});

			it('displays a high score', () => {
				expect(component.find('p.hi-score').text()).toEqual('50,000');
			});
		});
	});

	describe('logged in', () => {
		let component;
		beforeEach(async () => {
			component = mount(
				<MockedProvider
					mocks={[
						LOGGED_IN_USER,
						SCORES_MOCK,
						LOGOUT_MUTATION,
						LOGGED_OUT_USER,
					]}
					addTypename={false}
				>
					<Provider store={mockStore}>
						<MemoryRouter initialEntries={['/game']}>
							<Root>
								<TopMenu />
							</Root>
						</MemoryRouter>
					</Provider>
				</MockedProvider>
			);

			await updateComponent(component);
		});

		it('displays the logged in users name', () => {
			expect(component.find('p.player-name').text()).toEqual('Kanye');
		});

		it('displays trivia category', () => {
			expect(component.find('p.trivia-topic').text()).toEqual(
				'Entertainment: Cartoon & Animations'
			);
		});

		it('displays a logout option', () => {
			expect(component.find('p.logout-player').length).toEqual(1);
		});

		it('logs a user out', async () => {
			component.find('p.logout-player').simulate('click');

			await updateComponent(component, 20);
			// TODO: TEST RANDOMLY FAILS NEED TO ADDRESS
			expect(component.find('p.player-name').length).toEqual(0);
			expect(component.find('p.logout-player').length).toEqual(0);
		});
	});
});
