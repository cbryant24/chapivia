import React from 'react';
import { StateProvider } from './FormState';
import Form from './Form';
import { useFormInput } from './useInput';
import AuthReducer from './reducers';

export default function FormApp({form, inputs}) {
  const initialState = {
    theme: { primary: 'green' }
  };
  debugger
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
        <Form inputs={inputs} form={form}/>
        <useFormInput inputs={form}/>
    </StateProvider>
  );
}