import React from 'react';
import { FormInput } from './FormInput';
import * as Element from '../elements';
import { useStateValue } from './App';
import { validate } from '../helpers/validators';

export default function Form({inputs, form}) {
  const [{ fields }, dispatch] = useStateValue();

  const displayFields = () => {
    return inputs.map( input =>  {
      const field = FormInput(input);
      return <Element.Field {...input} {...field}/>  
    });
  }

  const handleCancel = cb => {
    dispatch({type: 'RESET'});
  }

  const handleSubmit = event => {
    event.preventDefault();
    const formVals = {}
    Object.keys(fields).map( field => formVals[field] = fields[field].value);

    const valid = validate.signup(formVals);
    console.log(validate.signup.errors);
    debugger
  }

  return (
    <Element.FlexForm
      {...form.style}
      onSubmit={(event) => handleSubmit(event)}
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
