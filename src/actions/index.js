// import types from 'actions/types';
// import { useDispatch } from 'react-redux';

// export function set_trivia(trivia) {
// 	return (dispatch) => {
// 		dispatch({
// 			type: types.SET_TRIVIA,
// 			payload: trivia,
// 		});
// 		// axios.post('/api/students', { fb_id }).then((res) => {
// 		// 	dispatch({
// 		// 		type: types.GET_STUDENTS,
// 		// 		payload: { type: 'students', data: res.data },
// 		// 	});
// 		// });
// 	};
// }

// export function openModalAction(message) {
// 	debugger;
// 	const dispatch = useDispatch();
// 	debugger;
// 	return dispatch({
// 		type: types.OPEN_MODAL,
// 		payload: {
// 			isOpen: true,
// 			message,
// 		}
// 	});
// }

// export function closeModalAction() {
// 	return {
// 		type: types.CLOSE_MODAL,
// 		payload: {
// 			isOpen: false,
// 			message: '',
// 		}
// 	};
// }
import React from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import triviaQuery from 'queries/Trivia';

export const Actions = {
  getTrivia() {
    const { loading: triviaLoading, data: triviaData } = useQuery(triviaQuery);


  },
}