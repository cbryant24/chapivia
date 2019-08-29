import styled from "styled-components";
import React, { useState } from 'react'

import BoxAll from './BoxAll';

import Text from './Text';
import Flex from './Flex';
import Box from './Box';


export const Error = styled(Text).attrs({
  className: 'error',
  color: 'error',
  f: 1,
  ml: 1,
  my: 0
})`
  font-weight: normal;
  &:before { content: '—'; }
`

const handleErrorMessages = errorMessages => {
  return errorMessages.map( errorMessage => <Box isA="item" key={errorMessage}><Error>{errorMessage}</Error></Box> )
}

//TODO: add option to chose normal password field no "show" option
const Field = ({ data: { name, type, placeholder, label }, fieldStyle, inputStyle, ...props }) => {
  const [shown, setShown] = useState(false);
  const errorColor = props.errors.length >= 1 ? '#e95667' : null; 
  const {display, ...inputStyleContainer } = inputStyle;
  const {border, borderTop, borderRight, borderBottom, borderLeft, borderRadius, borderWidth, borderColor, borderStyle, ...inputStyleNoBorder } = inputStyle;
  
  const inputType =
    {
      select: 'select',
      slider: 'slider',
      textarea: 'textarea'
    }[type] || 'input'
    // debugger
  return (
    <BoxAll {...fieldStyle}>
      <Flex
        alignItems="flex-end"
      >
        <Box isA="label" for={name} id={name}>
          {label}
        </Box>
        {props.errors.length >= 1 ? <Box isA="list" ml="2rem" color={errorColor} fontSize="1.2rem">{handleErrorMessages(props.errors)}</Box> : ''}
      </Flex>
      <BoxAll
        {...inputStyleContainer}
        display="flex"
        justifyContent="space-between"
        borderColor={errorColor}
        focusColor={errorColor} 
        foucsBoxShadowColor={errorColor}
      >
        <BoxAll
          {...props}
          {...inputStyleNoBorder}
          border="none"
          margin="0"
          padding="0"
          isA={inputType}
          name={name}
          type={shown && type === "password" ? 'text' : type} 
          placeholder={placeholder}
        />
        { type === "password" ? 
        <BoxAll
          isA="p"
          fontSize="10px"
          m="auto"
          onClick={() => setShown(!shown)}
          textTransform="uppercase"
          cursor='pointer'
        >
          {shown ? 'hide':'show'}
        </BoxAll> : '' }
      </BoxAll>
    </BoxAll>
  );
};

Field.displayName = 'Field';

Field.defaultProps = {
  // theme,
  type: 'text'
}

export default Field