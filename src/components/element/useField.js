import styled from "styled-components";
import React, { useState } from 'react'

import Text from './Text';
import Flex from './Flex';
import Box from './Box';
import Input from './Input';
import theme from './theme';

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
  return errorMessages.map( errorMessage => <Box as="item" key={errorMessage}><Error>{errorMessage}</Error></Box> )
}

const Field = ({ data: { name, type, placeholder, label }, fieldStyle, inputStyle, ...props }) => {
  const [shown, setShown] = React.useState(false);
  const errorColor = props.errors.length >= 1 ? '#e95667' : null; 
  const component =
    {
      select: 'select',
      slider: 'slider',
      textarea: 'textarea'
    }[type] || 'input'
    // debugger
  return (
    <Flex {...fieldStyle}>
      <Flex
        alignItems="flex-end"
      >
        <Box objectFit="cover"></Box>
        <Text as="label" for={name} id={name}>
          {label}
        </Text>
        {props.errors.length >= 1 ? <Box as="list" ml="2rem" color={errorColor} fontSize="1.2rem">{handleErrorMessages(props.errors)}</Box> : ''}
      </Flex>
      <Flex
        {...inputStyle}
        borderColor={errorColor}
        focusColor={errorColor} 
        foucsBoxShadowColor={errorColor}
      >
        <Input
          {...props}
          {...inputStyle}
          as={component}
          name={name}
          type={shown && type === "password" ? 'text' : type} 
          placeholder={placeholder}
        />
        { type ==="password" ? 
        <Text
          as="p"
          fontSize="12px"
          m="auto"
          onClick={() => setShown(!shown)}
          caps
          cursor='pointer'
        >
          {shown ? 'hide':'show'}
        </Text> : '' }
      </Flex>
    </Flex>
  );
};

Field.displayName = 'Field';

Field.defaultProps = {
  theme,
  type: 'text'
}

export default Field