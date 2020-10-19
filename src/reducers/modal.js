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

	switch (action.type) {
	case types.OPEN_MODAL:
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
