import types from 'actions/types';

const DEFAULT_STATE = {
	isOpen: false,
  message: '',
  afterClose: null,
  beforeClose: null,
  afterOpen: null,
  beforeOpen: null,
};

export default (state = DEFAULT_STATE, action) => {
  // console.log("IM THE OPEN REDUCER");
  console.log("IM THE ACTION TYPE", action.type);

	switch (action.type) {
	case types.OPEN_MODAL:
    // debugger;
    console.log("IM THE OPEN REDUCER");
		return {
      isOpen: true,
			...action.payload,
    };
  case types.CLOSE_MODAL:
    return {
      ...state,
      isOpen: false,
      message: '',
    };
	default:
			return state;
	}
};
