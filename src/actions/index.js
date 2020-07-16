import types from 'actions/types';

export function set_trivia(trivia) {

	return (dispatch) => {
		dispatch({
			type: types.SET_TRIVIA,
			payload: trivia,
		});
		// axios.post('/api/students', { fb_id }).then((res) => {
		// 	dispatch({
		// 		type: types.GET_STUDENTS,
		// 		payload: { type: 'students', data: res.data },
		// 	});
		// });
	};
}
