import React from 'react';
import { StateProvider } from './FormState';
import Form from './useForm';
import AuthReducer from './reducers';

import { useStateValue } from './FormState';

export { useStateValue };

export default function FormApp({form, inputs, validate}) {
  const initialState = {
    formName: form.data.name,
    fields: {}
  };

  function setInitialStateValues() {
  
    inputs.forEach( input => (
      initialState.fields = {
        ...initialState.fields,
        [input.data.name]: {
          value: input.data.initialValue || '',
          errorMessages: [],
          touched: false,
          dirty: false
        }
      } 
    ));
    return initialState
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_VALUE':
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
      case 'SET_ERROR_MESSAGE':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              errorMessages: action.payload.errorMessages
            }
          }
        };
      case 'SET_INPUT_TOUCH':
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
      case 'SET_INPUT_DIRTY':
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
        <Form inputs={inputs} form={form} validate={validate} />
    </StateProvider>
  );
}