import React from 'react';
import { useFormInput } from './useInput';
import * as Element from './elements';
import { useStateValue } from './FormState';


export default function Form({inputs, form}) {
  // const name = useFormInput('');
  const [{ theme }, dispatch] = useStateValue();
  
  const displayFields = () => {
    return inputs.map( input =>  {
      const field = useFormInput();
      return <Element.Field {...input} {...field}/> 
    })
  }

  const handleCancel = cb => {
    debugger
    // useFormInput('');
    // if(form.data.buttons) 
    //   return form.data.buttons[0].cancel();
  }

  debugger
  return (
    <Element.FlexForm
      // {...form.style}
      // onSubmit={(event) => form.data.submit(event)}
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
