import React from 'react';
import { useFormInput } from './useInput';
import * as Element from '../elements';
import { useStateValue } from './App';


export default function Form({inputs, form}) {
  const [{ fields }, dispatch] = useStateValue();

  const displayFields = () => {
    return inputs.map( input =>  {
      const field = useFormInput(input);
      return <Element.Field {...input} {...field}/> 
    });
  }

  const handleCancel = cb => {
    dispatch({type: 'RESET'});
  }

  debugger
  return (
    <Element.FlexForm
      {...form.style}
      onSubmit={(event) => form.data.submit(event, fields)}
    >
      {displayFields()}
      <Element.Input
        color="white"
        borderColor='primary'
        mt="1rem"
        type="submit"
        width="25%"
        type="submit"
      />
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
