import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import { updateComponent, mocks } from '__tests__/utils';
import Root from '__tests__/utils/Root';
import Modal from 'components/Modal';

describe('modal', () => {
	let component;
	describe('open', () => {
		beforeEach(() => {
			component = mount(
				<MockedProvider
					mocks={[mocks.LOGGED_OUT_USER, mocks.SCORES_MOCK]}
					addTypename={false}
				>
					<Root
						state={{
							modal: {
								isOpen: true,
								message: 'The Modal is Open!',
								afterClose: function myFunc() {},
								beforeClose: null,
								afterOpen: null,
								beforeOpen: null,
							},
						}}
					>
						<Modal />
					</Root>
				</MockedProvider>
			);

			updateComponent(component);
		});

		afterEach(() => component.unmount());

		it('displays a modal with a message', () => {
			expect(component.find('div#chapivia-modal').length).toEqual(1);
			expect(component.find('div#chapivia-modal p').text()).toEqual(
				'The Modal is Open!'
			);
		});
	});

	describe('closed', () => {
		beforeEach(() => {
			component = mount(
				<MockedProvider
					mocks={[mocks.LOGGED_OUT_USER, mocks.SCORES_MOCK]}
					addTypename={false}
				>
					<Root
						state={{
							modal: {
								isOpen: false,
								message: '',
								afterClose: null,
								beforeClose: null,
								afterOpen: null,
								beforeOpen: null,
							},
						}}
					>
						<Modal />
					</Root>
				</MockedProvider>
			);

			updateComponent(component);
		});

		it('does not display a modal', () => {
			expect(component.find('div#chapivia-modal').length).toEqual(0);
		});
	});
});
