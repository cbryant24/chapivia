import React from 'react';
import { formInput } from './FormInput';
import {Box, Field, Flex, BoxAll} from '../element';
import { useStateValue } from './App';
import { useWindowSize }from '../../hooks';
import { styleBuildRemove } from './utils';

//TODO: add option for user to provide html .class or #id for styling or selection themselves
export default function Form({ inputs, form, validate, buttons }) {
  
  const [{ formName, fields }, dispatch] = useStateValue();
  const [formErrors, setFormErrors] = React.useState([]);
  const size = useWindowSize();
  const errorColor = formErrors.length >= 1 ? '#e95667' : null;
  
  const displayFields = () => {
    if (Array.isArray(inputs)) {
      return inputs.map( input =>  {
        const field = formInput(input, validate);
        return <Field key={input.data.name} {...input} {...field} errors={fields[input.data.name].errorMessages}/>
      });
    }
    const field = formInput(inputs, validate);
    return <Field {...inputs} {...field} errors={fields[inputs.data.name].errorMessages}/>
    
  }

  const displayButtons = () => {

    return buttons.map( button => {
      const buttonStyle = styleBuildRemove(button.style);

      return ( 
        button.type === "submit" ? 
          <BoxAll
            isA="button"
            type={ button.type }
            disabled={ !isEnabled() }
            {...buttonStyle}
          > 
            {button.text} 
          </BoxAll> :
          <BoxAll
            isA="button"
            themeStyle="squareButton"
            type={ button.type }
          >
            {button.text}
          </BoxAll>
      );
    });
  };

  const handleErrorMessages = errorMessages => {
    return errorMessages.map( errorMessage => <Box isA="li" key={errorMessage.message}>{errorMessage.message}</Box> )
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
    <BoxAll
      isA="form"
      {...styleBuildRemove(form.style)}
      onSubmit={ event => handleSubmit(event) }
    >
      {formErrors.length >= 1 ? <Box
                                  isA="li"
                                  ml="2rem" 
                                  color={errorColor} 
                                  fontSize="1.2rem"
                                >
                                  {handleErrorMessages(formErrors)}
                                </Box> : ''}
      {displayFields()}
      <Box
        // width={size.width * .60 * .25}px
        justifyContent="space-between"
        fontSize="28rem"
      >
        {displayButtons()}
      </Box>
    </BoxAll>
  )
}