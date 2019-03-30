import React, { useState } from 'react';
import { useStateValue } from './FormState';

export const useFormInput = ({data}) => {
  const [{ fields }, dispatch] = useStateValue();

  function handleChange(e) {
    const { name: field, value } = e.target
    dispatch({type: 'CHANGE_VALUE', payload: {field, value} } );
  }

  return {
    value: fields[data.name].value,
    onChange: handleChange
  }
}