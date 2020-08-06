import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { modalState, triviaState } from '__tests__/utils';

import MainRoot from 'Root';

const mockStore = configureMockStore([]);

function Root({ children, state = {} }) {
	const store = mockStore(() => ({ ...modalState, ...triviaState, ...state }));
	return (
		<MainRoot>
			<Provider store={store}>{children}</Provider>
		</MainRoot>
	);
}

export function ShallowRoot(children, state = {}) {
	const store = mockStore(() => ({ ...modalState, ...triviaState, ...state }));
	return <Provider store={store}>{children}</Provider>;
}

export default Root;
