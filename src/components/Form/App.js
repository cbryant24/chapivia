import React from 'react';
import { StateProvider } from './FormState';
import Form from './Form';
import AuthReducer from './reducers';

import { useStateValue } from './FormState';

export { useStateValue };

export default function FormApp({form, inputs}) {
  const initialState = {
    fields: {}
  };

  function setInitialStateValues() {
    inputs.forEach( input => (
      initialState.fields = {
        ...initialState.fields,
        [input.data.name]: {
          value: '',
          errorMessage: '',
          touched: false,
          dirty: false
        }
      } 
    ));
    return initialState
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_VALUE':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              value: action.payload.value
            }
          }
        };
      case 'CHANGE_ERROR_MESSAGE':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              errorMessage: action.payload
            }
          }
        };
      case 'CHANGE_INPUT_TOUCH':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              touched: action.payload.touched
            }
          }
        };
      case 'CHANGE_INPUT_DIRTY':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              dirty: action.payload.dirty
            }
          }
        };
      case 'RESET':
        return setInitialStateValues();
    }
  }
  
  return (
    <StateProvider initialState={setInitialStateValues()} reducer={reducer}>
        <Form inputs={inputs} form={form}/>
    </StateProvider>
  );
}