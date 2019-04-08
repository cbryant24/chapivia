import React from 'react';
import { formInput } from './formInput';
import * as Element from '../elements';
import { useStateValue } from './App';
import { validate } from '../helpers/validators';

export default function Form({inputs, form}) {
  const [{ fields }, dispatch] = useStateValue();

  const displayFields = () => {
    return inputs.map( input =>  {
      const field = formInput(input);
      
      return <Element.Field key={input.data.name} {...input} {...field}/>  
    });
  }

  const handleCancel = () => dispatch({type: 'RESET'});

  const handleSubmit = event => {
    event.preventDefault();
    const formVals = {}
    Object.keys(fields).map( field => formVals[field] = fields[field].value);

    const valid = validate.signup(formVals);
  }

  const createButtons = () => {

  }

  return (
    <Element.FlexForm
      {...form.style}
      onSubmit={ event => handleSubmit(event) }
    >
      {displayFields()}
      <Element.Flex
        justifyContent="space-around"
      >
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
