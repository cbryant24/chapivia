import React, { useState, useEffect } from 'react';
import { formInput } from './FormInput';
import * as Element from '../element';
import { useStateValue } from './App';
import { useWindowSize }from '../../hooks';

export default function Form({ inputs, form, validate }) {
  const [{ formName, fields }, dispatch] = useStateValue();
  const [formErrors, setFormErrors] = React.useState([]);
  const size = useWindowSize();
  const errorColor = formErrors.length >= 1 ? '#e95667' : null;
  // const formFlex = 
  
  const displayFields = () => {
    return inputs.map( input =>  {
      const field = formInput(input, validate);
      return <Element.Field key={input.data.name} {...input} {...field} errors={fields[input.data.name].errorMessages}/>
    });
  }

  const handleErrorMessages = errorMessages => {
    return errorMessages.map( errorMessage => <Element.Item key={errorMessage.message}>{errorMessage.message}</Element.Item> )
  }

  const handleCancel = () => {
    dispatch({ type: 'RESET' });

    if (form.data.cancel) form.data.cancel();
  }


  const handleSubmit = event => {
    event.preventDefault();
    const { cb } = form.data;
    const { validation } = form.data;
    const formVals = {};

    Object.keys(fields).map( field => formVals[field] = fields[field].value);
    const valid = validate[formName]({ submit: { ...formVals, ...validation }});

    if (!valid)
      return validate[formName].errors.forEach( error => setFormErrors( errors => [...errors, error]));
      
    if(formErrors) setFormErrors([]);

    cb(event, formVals);
  }

  const isEnabled = () => {
    const disabled = inputs.some( input => {
                      return !(input.data.required ? 
                        fields[input.data.name].value.length
                        && !fields[input.data.name].errorMessages.length
                        && fields[input.data.name].dirty
                        : true );
                      });

    return !disabled;
  };

  return (
    <Element.Flex
      as="form"
      {...form.style}
      onSubmit={ event => handleSubmit(event) }
    >
      {formErrors.length >= 1 ? <Element.Box
                                  as="li"
                                  ml="2rem" 
                                  color={errorColor} 
                                  fontSize="1.2rem"
                                >
                                  {handleErrorMessages(formErrors)}
                                </Element.Box> : ''}
      {displayFields()}
      <Element.Flex
        width={size.width * .60 * .25}px
        justifyContent="space-between"
      >
        <Element.OutlineSubmit
          disabled={ !isEnabled() }

          type="submit"
        />
        <Element.OutlineButton
          onClick={ handleCancel }
        >
          Cancel
        </Element.OutlineButton>
      </Element.Flex>
    </Element.Flex>
  )
}
