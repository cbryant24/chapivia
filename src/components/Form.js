import React, { useState, useEffect } from 'react';
import { validate } from './helpers/validators';
import * as Element from './elements';

export default function Form() {
  const name = useFormInput('Charles');
  const email = useFormInput('charles@chapman.edu');


  return (
    <Element.FlexForm>
      <Element.Field
        name="name"
        type="text"
        label="Name"
        width="75%"
        flexDirection="column"
        {...name}
      />
    </Element.FlexForm>
  )
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [blur, setBlur] = useState(false);

  function handleChange(e) {

    setValue(e.target.value);
  }

  function handleBlur(e) {
    setBlur(true);
  }

  return {
    value,
    error,
    errorMessage,
    onChange: handleChange,
    onBlur: handleBlur
  };
}