import React, { useState } from 'react';
import { useStateValue } from './FormState';
import { validate } from '../helpers/validators';

export const FormInput = ({data}) => {
  const [{ fields }, dispatch] = useStateValue();

  function handleChange(e) {
    const { name: field, value } = e.target;
    
    const valid = validate.input({ [field]: value });
    console.log(validate.input.errors)
    debugger
    if(!fields[field].dirty)
      dispatch({ type: 'CHANGE_INPUT_DIRTY', payload: { field, dirty: true } });

    if(!valid) return dispatch({ 
      type: 'CHANGE_ERROR_MESSAGE', 
      payload: { field, errorMessage: `Invalid character used in ${field}` } 
    });

    if(fields[field].errorMessage)
      dispatch({ type: 'CHANGE_ERROR_MESSAGE', payload: { field, errorMessage: '' } });

    dispatch({type: 'CHANGE_VALUE', payload: { field, value} } );
  }

  function handleBlur(e) {
    const { name: field, value } = e.target;
    const valid = validate.input({ [field]: value});

    if(!fields[field].touched)
      dispatch({ type: 'CHANGE_INPUT_TOUCH', payload: { field, touched: true }});

    if(valid && fields[field].errorMessage)
      dispatch({ type: 'CHANGE_ERROR_MESSAGE', payload: { field, errorMessage: '' } });
  }

  return {
    value: fields[data.name].value,
    error: fields[data.name].errorMessage,
    onBlur: handleBlur,
    onChange: handleChange
  }
}