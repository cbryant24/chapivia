export const formReducer = (state, action) => {
  debugger
  switch (action.type) {
    case 'updateInput':
      return {
        ...state,
        theme: action.newTheme
      };
      
    default:
      return state;
  }
};