import React from 'react';
import { useFormInput } from './useInput';
import * as Element from './elements';
import { useStateValue } from './FormApp';


export default function Form({inputs, form}) {
  // const name = useFormInput('');
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

  const handleSubmit = form.data.submit

  debugger
  return (
    <Element.FlexForm
      {...form.style}
      onSubmit={(event) => form.data.submit(event, fields)}
    >
      {displayFields()}
      <Element.Input
        // color="white"
        // borderColor='primary'
        // mt="1rem"
        // type="submit"
        // width="25%"
        // onClick={ (e) => form.data.submit(e) }
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
