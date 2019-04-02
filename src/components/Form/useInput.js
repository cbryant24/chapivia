import React, { useState } from 'react';
import { useStateValue } from './FormState';
import { validate } from '../helpers/validators';

export const useFormInput = ({data}) => {
  const [{ fields }, dispatch] = useStateValue();

  function handleChange(e) {
    const { name: field, value } = e.target;
    
    const valid = validate.input({ [field]: value });
    if(!valid) return dispatch({ 
      type: 'CHANGE_ERROR_MESSAGE', 
      payload: {field, errorMessage: `Invalid character used in ${field}` } 
    });

    if(fields[field].errorMessage)
      dispatch({type: 'CHANGE_ERROR_MESSAGE', payload: {field, errorMessage: '' } });

    dispatch({type: 'CHANGE_VALUE', payload: {field, value} } );
  }

  return {
    value: fields[data.name].value,
    error: fields[data.name].errorMessage,
    onChange: handleChange
  }
}