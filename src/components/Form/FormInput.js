import React, { useState } from 'react';
import { useStateValue } from './FormState';
import { validate } from '../helpers/validators';

export const formInput = ({data: { name, validation } }) => {
  const [{ fields }, dispatch] = useStateValue();

  function handleChange(e) {
    const { name: field, value } = e.target;
    // const valid = validate.input({ [field]: value });
    // console.log(validate)
    // debugger
    const valid = validate.form({
      [field]: { blur: value, ...validation } 
    });
    console.log(validate.form.errors)
    // debugger

    // if(!fields[field].dirty)
    //   dispatch({ type: 'SET_INPUT_DIRTY', payload: { field, dirty: true } });

    // if(!valid) {
    //   const errorMessages = [];
    //   validate.input.errors.map( error => errorMessages.push(error.message));
    //   return dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessages }});
    // }

    // if(fields[field].errorMessage)
    //   dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessage: [] } });

    dispatch({type: 'SET_VALUE', payload: { field, value } } );
  }

  function handleBlur(e) {
    // const { name: field, value } = e.target;
    // const valid = validate.input({ [field]: value});

    // if(!fields[field].touched)
    //   dispatch({ type: 'SET_INPUT_TOUCH', payload: { field, touched: true }});

    // if(valid && fields[field].errorMessage)
    //   dispatch({ type: 'SET_ERROR_MESSAGE', payload: { field, errorMessage: '' } });
  }

  return {
    value: fields[name].value,
    errors: fields[name].errorMessage,
    onBlur: handleBlur,
    onChange: handleChange
  }
}