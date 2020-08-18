//TODO: TEST TO MAK SURE USER NAME APPEARS IN GUESS FROM AFTER SIGNUP
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';

import Root from '__tests__/utils/Root';
import Register from 'components/Register';
import { updateComponent, mocks, mockDispatchFn } from '__tests__/utils';

let component, appHistory, appLocation;

const NAME_INPUT = 'input[name="name"]',
	EMAIL_INPUT = 'input[name="email"]',
	PASSWORD_INPUT = 'input[name="password"]',
	CONFIRM_PASSWORD_INPUT = 'input[name="confirm password"]',
	REGISTER_FORM = 'form#register-form',
	VALID_NAME = {
		target: { value: 'Kanye', name: 'name' },
	},
	VALID_EMAIL = {
		target: { value: 'kanye@west.com', name: 'email' },
	},
	VALID_PASSWORD = {
		target: { value: 'abc12345', name: 'password' },
	},
	VALID_CONFIRM_PASSWORD = {
		target: { value: 'abc12345', name: 'confirm password' },
	};

function initComponent(options) {
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
			<MemoryRouter initialEntries={[{ pathname: ['/register'] }]}>
				<Route
					path="*"
					render={({ history, location }) => {
						appHistory = history;
						appLocation = location;
						return null;
					}}
				/>
				<Root state={state}>
					<Register />
				</Root>
			</MemoryRouter>
		</MockedProvider>
	);
}

describe('register', async () => {
	beforeEach(async () => {
		initComponent({
			mocks: ['LOGGED_OUT_USER', 'LOGGED_IN_USER', 'REGISTER_MUTATION'],
		});

		// SEE THIS GITHUB ISSUE FOR EXPLANATION https://github.com/enzymejs/enzyme/issues/2073#issuecomment-531488981
		await updateComponent(component);
	});

	describe('logged in', async () => {
		beforeEach(async () => {
			initComponent({ mocks: ['LOGGED_IN_USER'] });

			await updateComponent(component);
		});

		it('redirects the user to game from registration', () => {
			expect(mockDispatchFn).toHaveBeenCalledWith({
				payload: {
					afterClose: expect.any(Function),
					message:
						"Kanye is already logged in you'll be redirected to main game",
				},
				type: 'OPEN_MODAL',
			});
		});
	});

	describe('form fields', () => {
		afterEach(() => component.unmount());

		it('has a name input', () => {
			expect(component.find(NAME_INPUT).length).toEqual(1);
		});

		it('has an email input', () => {
			expect(component.find(EMAIL_INPUT).length).toEqual(1);
		});

		it('has a password input', () => {
			expect(component.find(PASSWORD_INPUT).length).toEqual(1);
		});

		it('has a confirm password input', () => {
			expect(component.find(CONFIRM_PASSWORD_INPUT).length).toEqual(1);
		});
	});

	describe('form inputs', () => {
		afterEach(() => component.unmount());

		it('can enter a users name in the name input', () => {
			component.find(NAME_INPUT).simulate('change', VALID_NAME);

			expect(component.find(NAME_INPUT).instance().value).toEqual('Kanye');
		});

		it('can enter a users email in the email input', () => {
			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

			expect(component.find(EMAIL_INPUT).instance().value).toEqual(
				'kanye@west.com'
			);
		});

		it('can enter a users password in the password input', () => {
			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			expect(component.find(PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);
		});

		it('can enter a users confirm password in the confirm password input', () => {
			component
				.find(CONFIRM_PASSWORD_INPUT)
				.simulate('change', VALID_CONFIRM_PASSWORD);

			expect(component.find(CONFIRM_PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);
		});

		it('clears the form inputs when the cancel button is clicked', () => {
			component.find(NAME_INPUT).simulate('change', VALID_NAME);
			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);
			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);
			component
				.find(CONFIRM_PASSWORD_INPUT)
				.simulate('change', VALID_CONFIRM_PASSWORD);

			expect(component.find(NAME_INPUT).instance().value).toEqual('Kanye');
			expect(component.find(EMAIL_INPUT).instance().value).toEqual(
				'kanye@west.com'
			);
			expect(component.find(PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);
			expect(component.find(CONFIRM_PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);

			component.find('div[type="cancel"]').simulate('mousedown');

			expect(component.find(NAME_INPUT).instance().value).toEqual('');
			expect(component.find(EMAIL_INPUT).instance().value).toEqual('');
			expect(component.find(PASSWORD_INPUT).instance().value).toEqual('');
			expect(component.find(CONFIRM_PASSWORD_INPUT).instance().value).toEqual(
				''
			);
		});
	});

	describe('register form submission', () => {
		beforeEach(() => {
			component.find(NAME_INPUT).simulate('change', VALID_NAME);

			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			component
				.find(CONFIRM_PASSWORD_INPUT)
				.simulate('change', VALID_CONFIRM_PASSWORD);
		});

		it('clears a the name input after submission', () => {
			expect(component.find(NAME_INPUT).instance().value).toEqual('Kanye');

			component.find(REGISTER_FORM).simulate('submit');

			expect(component.find(NAME_INPUT).instance().value).toEqual('');
		});

		it('clears a the email input after submission', () => {
			expect(component.find(EMAIL_INPUT).instance().value).toEqual(
				'kanye@west.com'
			);

			component.find(REGISTER_FORM).simulate('submit');

			expect(component.find(EMAIL_INPUT).instance().value).toEqual('');
		});

		it('clears the password input after submission', () => {
			expect(component.find(PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);

			component.find(REGISTER_FORM).simulate('submit');

			expect(component.find(PASSWORD_INPUT).instance().value).toEqual('');
		});

		it('clears a the confirm password input after submission', () => {
			expect(component.find(CONFIRM_PASSWORD_INPUT).instance().value).toEqual(
				'abc12345'
			);

			component.find(REGISTER_FORM).simulate('submit');

			expect(component.find(CONFIRM_PASSWORD_INPUT).instance().value).toEqual(
				''
			);
		});

		it('submits the form and forwards the user to /game', async () => {
			component.find(REGISTER_FORM).simulate('submit');

			await updateComponent(component, 5);

			expect(appHistory.location.pathname).toBe('/game');
		});
	});

	describe('inputs invalid errors', () => {
		afterEach(() => component.unmount());

		it('displays an error when invalid character is used in name input', () => {
			component.find(NAME_INPUT).simulate('change', {
				target: { value: ';', name: 'name' },
			});

			expect(component.find('ul.styled-react-errors__name li').length).toEqual(
				1
			);
		});

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

		it('displays an error when invalid character is used in confirm password input', () => {
			component.find(CONFIRM_PASSWORD_INPUT).simulate('change', {
				target: { value: ';', name: 'confirm password' },
			});

			expect(
				component.find('ul.styled-react-errors__confirm-password li').length
			).toEqual(1);
		});
	});

	describe('invalid form submissions', () => {
		it('displays form error when submitting with invalid name value', () => {
			component.find(NAME_INPUT).simulate('change', {
				target: { value: ';', name: 'name' },
			});

			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			component
				.find(CONFIRM_PASSWORD_INPUT)
				.simulate('change', VALID_CONFIRM_PASSWORD);

			component.find(REGISTER_FORM).simulate('submit');

			expect(
				component.find('form ul.styled-react-form-errors__registerForm li')
					.length
			).toEqual(1);
		});

		it('displays form error when submitting with invalid email value', () => {
			component.find(NAME_INPUT).simulate('change', VALID_NAME);

			component.find(EMAIL_INPUT).simulate('change', {
				target: { value: 'kanye', name: 'email' },
			});

			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			component
				.find(CONFIRM_PASSWORD_INPUT)
				.simulate('change', VALID_CONFIRM_PASSWORD);

			component.find(REGISTER_FORM).simulate('submit');

			expect(
				component.find('form ul.styled-react-form-errors__registerForm li')
					.length
			).toEqual(1);
		});

		it('displays form error when submitting with invalid password and confirm password value', () => {
			component.find(NAME_INPUT).simulate('change', VALID_NAME);

			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

			component.find(PASSWORD_INPUT).simulate('change', {
				target: { value: ';', name: 'password' },
			});

			component
				.find(CONFIRM_PASSWORD_INPUT)
				.simulate('change', VALID_CONFIRM_PASSWORD);

			component.find(REGISTER_FORM).simulate('submit');

			expect(
				component.find('form ul.styled-react-form-errors__registerForm li')
					.length
			).toEqual(2);
		});

		it('displays form error when submitting with mismatching password and confirm password value', () => {
			component.find(NAME_INPUT).simulate('change', VALID_NAME);

			component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

			component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

			component.find(CONFIRM_PASSWORD_INPUT).simulate('change', {
				target: { value: 'def67890', name: 'confirm password' },
			});

			component.find(REGISTER_FORM).simulate('submit');

			expect(
				component.find('form ul.styled-react-form-errors__registerForm li')
					.length
			).toEqual(1);
		});

		describe('network errors', () => {
			beforeEach(async () => {
				initComponent({ mocks: ['LOGGED_OUT_USER', 'REGISTER_ERROR'] });

				await updateComponent(component);
			});

			afterEach(() => component.unmount());

			it('displays the modal with server error', async () => {
				component.find(NAME_INPUT).simulate('change', VALID_NAME);

				component.find(EMAIL_INPUT).simulate('change', VALID_EMAIL);

				component.find(PASSWORD_INPUT).simulate('change', VALID_PASSWORD);

				component
					.find(CONFIRM_PASSWORD_INPUT)
					.simulate('change', VALID_CONFIRM_PASSWORD);

				component.find(REGISTER_FORM).simulate('submit');

				await updateComponent(component);

				expect(mockDispatchFn).toHaveBeenCalledWith({
					payload: {
						message:
							'There was an error registering if error continues please try again later',
					},
					type: 'OPEN_MODAL',
				});
			});
		});
	});
});
