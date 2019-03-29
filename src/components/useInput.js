import React, { useState } from 'react';
import { useStateValue } from './FormState';

export const useFormInput = (props) => {
  debugger
  // const [value, setValue] = useState(initialValue);
  const [{ theme }, dispatch] = useStateValue();
  debugger
  function handleChange(e) {
    const { name: field, value } = e.target;
    debugger
    // valid = a
    // setValue(e.target.value);
  }

  // return {
  //   value,
  //   onChange: handleChange
  // }
}