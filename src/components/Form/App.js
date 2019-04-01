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
          error: {
            status: false,
            message: ''
          },
          touched: false,
          dirty: false
        }
      } 
    ));
    return initialState
  }

  const reducer = (state, action) => {
    debugger
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
      case 'CHANGE_ERROR_STATUS':
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.field]: {
              ...state.fields[action.payload.field],
              error: action.payload.value
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
              touched: action.payload.value
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
              dirty: action.payload.value
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
        <useFormInput inputs={form}/>
    </StateProvider>
  );
}