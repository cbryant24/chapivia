import React from 'react';
import { formInput } from './FormInput';
import * as Element from '../elements';
import { useStateValue } from './App';
import { validate } from '../helpers/validators';

export default function Form({inputs, form, buttons}) {
  // debugger
  const [{ fields }, dispatch] = useStateValue();

  const displayFields = () => {
    return inputs.map( input =>  {
      const field = formInput(input);
      return <Element.Field key={input.data.name} {...input} {...field}/>  
    });
  }

  const handleCancel = () => dispatch({type: 'RESET'});

  const handleSubmit = event => {
    const { validation } = form.data
    event.preventDefault();
    const formVals = {}
    Object.keys(fields).map( field => formVals[field] = fields[field].value);
    const valid = validate.form({ submit: { ...formVals }, ...validation });
    console.log(validate)
    debugger
  }

  const createButtons = () => {
    return form.data.buttons
  }

  return (
    <Element.FlexForm
      {...form.style}
      onSubmit={ event => handleSubmit(event) }
    >
      {displayFields()}
      <Element.Flex >
        <Element.OutlineSubmit
          mt="1rem"
          type="submit"
          width="25%"
          type="submit"
          fontSize="28px"
        />
        <Element.OutlineButton
          mt="1rem"
          type="submit"
          width="25%"
          onClick={ handleCancel }
        >
          Cancel
        </Element.OutlineButton>
      </Element.Flex>
    </Element.FlexForm>
  )
}
