import React, { useState } from 'react';
import * as Element from './elements';

export default function Input({form, inputs}) {
  // const name = useFormInput('');

  const displayFields = () => {
    return inputs.map( input =>  {
      const field = useFormInput('');
      return <Element.Field {...input} {...field}/> 
    })
  }

  const handleCancel = cb => {
    debugger
    useFormInput('');
    if(form.data.buttons) 
      return form.data.buttons[0].cancel();

  }
  debugger
  return (
    <Element.FlexForm
      {...form.style}
      // onSubmit={(event) => this.signin(event)}
    >
      {displayFields()}
      <Element.OutlineButton
        color="white"
        borderColor='primary'
        mt="1rem"
        type="submit"
        width="25%"
        onClick={ (e) => form.data.submit(e) }
      >
        Sign Up
      </Element.OutlineButton>
      <Element.OutlineButton
        color="white"
        borderColor='primary'
        mt="1rem"
        type="submit"
        width="25%"
        onClick={ handleCancel }
      >
        Cancel
      </Element.OutlineButton>
    </Element.FlexForm>
  )
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  function handleChange(e) {
    const { name: field, value } = e.target;
    debugger
    // valid = a
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  }
}