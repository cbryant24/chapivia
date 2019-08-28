import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from './FormState';

export const formInput = ( { data: { name, inputData, validation } }, validate) => {
  const [{ formName, fields }, dispatch] = useStateValue();
// debugger
  useEffect( () => {

  }, [])
  function handleChange(e) {
    const { name: field, value } = e.target;
    const valid = validate[formName]({
      [field]: { change: value }
    });
    
    if(!fields[field].dirty)
      dispatch({ type: 'SET_INPUT_DIRTY', payload: { field, dirty: true } });

    if(!valid) {
      const errorMessages = [];
      validate[formName].errors.map( error => errorMessages.push(error.message));
      return dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages }});
    }

    if(fields[field].errorMessages)
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages: [] } });

    dispatch({type: 'SET_VALUE', payload: { field, value }});
  }

  function handleBlur(e) {
    const { name: field, value } = e.target;
    
    const valid = validate[formName]({ [field]: { blur: value, ...validation }});
    
    if(!fields[field].touched)
      dispatch({ type: 'SET_INPUT_TOUCH', payload: { field, touched: true }});

    if(!valid) {
      const errorMessages = [];
      validate[formName].errors.map( error => errorMessages.push(error.message));
      return dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages }});
    }

    if(valid && fields[field].errorMessages)
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages: [] } });
  }

  return {
    value: fields[name].value,
    errors: fields[name].errorMessage,
    onBlur: handleBlur,
    onChange: handleChange
  }
}