import React from 'react';
import TopMenu from 'components/TopMenu';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';

import { updateComponent, mocks } from '__tests__/utils';
import Root from '__tests__/utils/Root';

describe('top menu', () => {
	let component;

	describe('logged out', () => {
		describe('login page', () => {
			beforeEach(async () => {
				component = mount(
					<MockedProvider
						mocks={[mocks.LOGGED_OUT_USER, mocks.SCORES_MOCK]}
						addTypename={false}
					>
						<MemoryRouter initialEntries={['/']}>
							<Root>
								<TopMenu />
							</Root>
						</MemoryRouter>
					</MockedProvider>
				);

				await updateComponent(component);
			});

			it('displays a link to signup', () => {
				expect(component.find('a[href="/register"]').length).toEqual(1);
			});

			it('displays a high score', () => {
				expect(component.find('p.hi-score').text()).toEqual('50,000');
			});
		});

		describe('signup page', () => {
			beforeEach(async () => {
				component = mount(
					<MockedProvider
						mocks={[mocks.LOGGED_OUT_USER, mocks.SCORES_MOCK]}
						addTypename={false}
					>
						<MemoryRouter initialEntries={[{ pathname: '/register' }]}>
							<Root>
								<TopMenu />
							</Root>
						</MemoryRouter>
					</MockedProvider>
				);

				await updateComponent(component);
			});

			it('displays link to login', () => {
				expect(component.find('a[href="/"]').length).toEqual(1);
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
						mocks.LOGGED_IN_USER,
						mocks.SCORES_MOCK,
						mocks.LOGOUT_MUTATION,
						mocks.LOGGED_OUT_USER,
					]}
					addTypename={false}
				>
					<MemoryRouter initialEntries={['/game']}>
						<Root>
							<TopMenu />
						</Root>
					</MemoryRouter>
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
