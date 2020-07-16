import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import 'jest-styled-components';

import Root from 'Root';
import Login from 'components/Login';
import Game from 'components/Game';

import { updateComponent } from 'utils/test/functions';
import {
	LOGGED_OUT_USER,
	LOGIN_MUTATION,
	LOGGED_IN_USER,
	LOGIN_ERROR,
} from 'utils/test/mocks';

let component, appHistory, appLocation;

const EMAIL_INPUT = 'input[name="email"]',
	PASSWORD_INPUT = 'input[name="password"]',
	LOGIN_FORM = 'form#login-form',
	VALID_EMAIL = {
		target: { value: 'kanye@west.com', name: 'email' },
	},
	VALID_PASSWORD = {
		target: { value: 'abc12345', name: 'password' },
	};

describe('login', () => {
	beforeEach(async () => {
		component = mount(
			<MockedProvider
				mocks={[LOGGED_OUT_USER, LOGIN_MUTATION, LOGGED_IN_USER]}
				addTypename={false}
			>
				<MemoryRouter initialEntries={[{ pathname: '/' }]}>
					<Root>
						<Login />
					</Root>
				</MemoryRouter>
			</MockedProvider>
		);

		await updateComponent(component);
	});

	afterEach(() => component.unmount());

	it('hides the login form until title is clicked', async () => {
		expect(component.find('h3')).toHaveStyleRule('display', 'block');
		expect(component.find('#login-form-container').hostNodes()).toHaveStyleRule(
			'display',
			'none'
		);

		component.find('h3').simulate('click');

		expect(component.find('h3')).toHaveStyleRule('display', 'none');
		expect(component.find('#login-form-container').hostNodes()).toHaveStyleRule(
			'display',
			'block'
		);
	});

	describe('form inputs', () => {
		// afterEach(() => component.unmount());

		it('has an email input', () => {
			expect(component.find(EMAIL_INPUT).length).toEqual(1);
		});

		it('has a password input', () => {
			expect(component.find(PASSWORD_INPUT).length).toEqual(1);
		});

		it('can enter an email in the email input', () => {
			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

			expect(component.find(EMAIL_INPUT).instance().value).toEqual(
				'kanye@west.com'
			);
		});

		it('can enter a password in the password input', () => {
			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			expect(component.find(PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);
		});

		it('clears the form inputs when the cancel button is clicked', () => {
			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);
			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			expect(component.find(EMAIL_INPUT).instance().value).toEqual(
				'kanye@west.com'
			);
			expect(component.find(PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);

			component.find('div[type="cancel"]').simulate('mousedown');

			expect(component.find(EMAIL_INPUT).instance().value).toEqual('');
			expect(component.find(PASSWORD_INPUT).instance().value).toEqual('');
		});
	});

	describe('login form submission', () => {
		beforeEach(async () => {
			component = mount(
				<MockedProvider
					mocks={[LOGGED_OUT_USER, LOGIN_MUTATION, LOGGED_IN_USER]}
					addTypename={false}
				>
					<MemoryRouter initialEntries={['/']}>
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
								path="/game"
								render={({ history, location }) => {
									appHistory = history;
									appLocation = location;
									return null;
								}}
							/>
						</Root>
					</MemoryRouter>
				</MockedProvider>
			);

			await updateComponent(component);

			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);
			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);
		});

		it('clears a the email input after submission', async () => {
			expect(component.find(EMAIL_INPUT).instance().value).toEqual(
				'kanye@west.com'
			);

			component.find(LOGIN_FORM).simulate('submit');

			await updateComponent(component);

			expect(component.find(EMAIL_INPUT).instance().value).toEqual('');
		});

		it('clears a the password input after submission', async () => {
			expect(component.find(PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);

			component.find(LOGIN_FORM).simulate('submit');

			await updateComponent(component);

			expect(component.find(PASSWORD_INPUT).instance().value).toEqual('');
		});

		it('submits the form and forwards the user to /game', async () => {
			component.find(LOGIN_FORM).simulate('submit');

			await updateComponent(component, 30);
			//TODO: TEST RANDOMLY FAILS HERE
			expect(appHistory.location.pathname).toBe('/game');
		});
	});

	describe('inputs invalid errors', () => {
		it('displays an error when invalid email address is used in name input', () => {
			component.find(EMAIL_INPUT).simulate('change', {
				target: { value: 'kanye', name: 'email' },
			});

			component.find(EMAIL_INPUT).simulate('blur');

			expect(component.find('ul.styled-react-errors__email li').length).toEqual(
				1
			);
		});

		it('displays an error when invalid character is used in password input', () => {
			component.find(PASSWORD_INPUT).simulate('change', {
				target: { value: ';', name: 'password' },
			});

			expect(
				component.find('ul.styled-react-errors__password li').length
			).toEqual(1);
		});
	});

	describe('invalid form submissions', () => {
		it('displays form error when submitting with invalid email value', async () => {
			component.find(EMAIL_INPUT).simulate('change', {
				target: { value: 'kanye', name: 'email' },
			});

			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			component.find(LOGIN_FORM).simulate('submit');

			await updateComponent(component);

			expect(
				component.find('form ul.styled-react-form-errors__loginForm li').length
			).toEqual(1);
		});

		it('displays form error when submitting with invalid password value', async () => {
			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

			component.find(PASSWORD_INPUT).simulate('change', {
				target: { value: ';', name: 'password' },
			});

			component.find(LOGIN_FORM).simulate('submit');

			await updateComponent(component);

			expect(
				component.find('form ul.styled-react-form-errors__loginForm li').length
			).toEqual(1);
		});

		describe('network errors', () => {
			beforeEach(async () => {
				component = mount(
					<MockedProvider
						mocks={[LOGGED_OUT_USER, LOGIN_ERROR]}
						addTypename={false}
					>
						<Root>
							<MemoryRouter initialEntries={['/']}>
								<Login />
							</MemoryRouter>
						</Root>
					</MockedProvider>
				);

				await updateComponent(component);
			});

			it('displays the modal with server error', async () => {
				component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

				component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

				component.find(LOGIN_FORM).simulate('submit');

				await updateComponent(component);

				expect(component.find('#chapivia-modal ul li').text()).toEqual(
					'There was an error logging in'
				);
			});
		});
	});
});
