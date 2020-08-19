import React from 'react';
import TopMenu from 'components/TopMenu';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';

import { updateComponent, mocks } from '__tests__/utils';
import Root from '__tests__/utils/Root';

let component;

function initComponent(options) {
	const {
			mocks: componentMocks,
			state: componentState,
			pathname = ['/'],
		} = options,
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
			<MemoryRouter initialEntries={[{ pathname }]}>
				<Root state={state}>
					<TopMenu />
				</Root>
			</MemoryRouter>
		</MockedProvider>
	);
}

describe('top menu', () => {
	describe('logged out', () => {
		describe('login page', () => {
			beforeEach(async () => {
				initComponent({ mocks: ['LOGGED_OUT_USER', 'SCORES_MOCK'] });

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
				initComponent({
					mocks: ['LOGGED_OUT_USER', 'SCORES_MOCK'],
					pathname: ['/register'],
				});

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
		beforeEach(async () => {
			initComponent({
				mocks: [
					'LOGGED_IN_USER',
					'SCORES_MOCK',
					'LOGOUT_MUTATION',
					'LOGGED_OUT_USER',
				],
			});

			await updateComponent(component, 100);
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

			expect(component.find('p.player-name').length).toEqual(0);
			expect(component.find('p.logout-player').length).toEqual(0);
		});
	});
});
