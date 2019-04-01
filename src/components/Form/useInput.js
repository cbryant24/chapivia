import React, { useState } from 'react';
import { useStateValue } from './FormState';
import { validate } from '../helpers/validators';

export const useFormInput = ({data}) => {
  const [{ fields }, dispatch] = useStateValue();

  function handleChange(e) {
    const { name: field, value } = e.target;
    
    const valid = validate.input({ [field]: value });
    debugger
    dispatch({type: 'CHANGE_VALUE', payload: {field, value} } );
  }

  return {
    value: fields[data.name].value,
    onChange: handleChange
  }
}