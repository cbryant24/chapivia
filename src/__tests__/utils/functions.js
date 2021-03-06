import { act } from 'react-dom/test-utils';
import wait from 'waait';
import * as ReactRedux from 'react-redux';

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper
export async function actWait(amount = 0) {
	await act(async () => {
		await wait(amount);
	});
}

// Use this in your test after mounting if you want the query to finish and update the wrapper
export async function updateComponent(component, amount = 0) {
	await act(async () => {
		await wait(amount);
		component.update();
	});
}

const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch');
export const mockDispatchFn = jest.fn();
useDispatchSpy.mockReturnValue(mockDispatchFn);
