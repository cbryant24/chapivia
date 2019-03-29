import React from 'react';
import { StateProvider } from './FormState';
import Form from './Form'
import { useFormInput } from './useInput'

export default function FormApp({form, inputs}) {
  const initialState = {
    theme: { primary: 'green' }
  };
  debugger
  const reducer = (state, action) => {
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
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
        <Form inputs={inputs} form={form}/>
        <useFormInput inputs={form}/>
    </StateProvider>
  );
}