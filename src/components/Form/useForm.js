import React from 'react';
import { formInput } from './FormInput';
import {Box, Field, Flex, Button} from '../element';
import { useStateValue } from './App';
import { useWindowSize }from '../../hooks';

import { squareButton } from '../elements/theme';

export default function Form({ inputs, form, validate, buttons }) {
  
  const [{ formName, fields }, dispatch] = useStateValue();
  const [formErrors, setFormErrors] = React.useState([]);
  const size = useWindowSize();
  const errorColor = formErrors.length >= 1 ? '#e95667' : null;
  // const formFlex = 
  
  const displayFields = () => {
    return inputs.map( input =>  {
      const field = formInput(input, validate);
      return <Field key={input.data.name} {...input} {...field} errors={fields[input.data.name].errorMessages}/>
    });
  }

  const displayButtons = () => {
    // debugger
    const vals = {
      fontSize: [2, 3]
    }
    return buttons.map( button => (
      button.type === 'submit' ? 
      <Button
        forwardedAs="button"
        type={ button.type }
        disabled={ !isEnabled() }
        {...squareButton}
      > {button.text} </Button> :
      <Button
        forwardedAs="button"
        //fontSize={[1, 2, 3]}
        {...squareButton}
        //{...vals}
        type={ button.type }
      >
        {button.text}
      </Button>
    ))
  }

  const handleErrorMessages = errorMessages => {
    return errorMessages.map( errorMessage => <Box as="li" key={errorMessage.message}>{errorMessage.message}</Box> )
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
  // debugger
  return (
    <Flex
      as="form"
      {...form.style}
      onSubmit={ event => handleSubmit(event) }
    >
      {formErrors.length >= 1 ? <Box
                                  as="li"
                                  ml="2rem" 
                                  color={errorColor} 
                                  fontSize="1.2rem"
                                >
                                  {handleErrorMessages(formErrors)}
                                </Box> : ''}
      {displayFields()}
      <Flex
        // width={size.width * .60 * .25}px
        justifyContent="space-between"
        fontSize="28rem"
      >
        {displayButtons()}
        {/* <Button
          type="submit"
          disabled={ !isEnabled() }
          text="Sign-In"
        />
        <Button
          text="Cancel"
          onClick={ handleCancel }
        /> */}
      </Flex>
    </Flex>
  )
}
