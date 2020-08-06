import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router';

import { updateComponent, mocks } from '__tests__/utils';
import Root from '__tests__/utils/Root';
import Modal from 'components/Modal';
import TopMenu from 'components/TopMenu';

describe('modal', () => {
	let component;
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
							message: 'Hello World',
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

		updateComponent(component, 140);
	});

	it('displays a modal', () => {
		expect(component.find('#chapivia-modal').length).toEqual(2);
	});
});
