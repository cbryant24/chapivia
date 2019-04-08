import React, { useState } from 'react'

import Label from './Label'
import Flex from './Flex'
import { FlexInput } from './Flex';
import Text from './Text'
import List from './List'
import Item from './Item'
import Input, { InputSelect, InputTextarea } from './Input'
import Slider from './Slider'
import PropTypes from 'prop-types'
import theme from './theme'

export const Error = Text.extend.attrs({
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
  return errorMessages.map( errorMessage => <Item key={errorMessage}>{errorMessage}</Item> )
}

const Field = ({ data: { name, type, placeholder, label }, flexStyle, inputStyle, ...props }) => {
  const [shown, setShown ] = React.useState(false);
  const errorColor = props.errors.length >= 1 ? '#e95667' : null; 
  const Component =
    {
      select: InputSelect,
      slider: Slider,
      textarea: InputTextarea
    }[type] || Input
  return (
    <Flex {...flexStyle}>
      <Label for={name} id={name}>
        {label}
      </Label>
      <FlexInput
        borderColor={errorColor}
        focusColor={errorColor} 
        foucsBoxShadowColor={errorColor}
        flexDirection="row"
        flexGrow="2"
        p="4px"
      >
        <Component 
          {...props}
          name={name} 
          type={shown && type === "password" ? 'text' : type} 
          placeholder={placeholder}
          flexGrow="2"
          border="none"
          borderFocus="transparent"
          focusColor="transparent"
          foucsBoxShadowColor="transparent"
        />
        { type ==="password" ? 
        <Text.p
          fontSize="12px"
          m="auto"
          onClick={() => setShown(!shown)}
          caps
          cursor='pointer'
        >
          {shown ? 'hide':'show'}
        </Text.p> : '' }
      </FlexInput>
      {props.errors.length >= 1 ? <List>handleErrorMessages(props.error)</List> : ''}
    </Flex>
  );
};

Field.displayName = 'Field';

Field.propTypes = {
  /** choose alternate field type (like email, textarea, slider, or select) */
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'file',
    'checkbox',
    'tel',
    'url',
    'textarea',
    'select'
  ]),
  name: PropTypes.string.isRequired,
  /** label text */
  label: PropTypes.string.isRequired,
  /** validation message */
  error: PropTypes.array,
  /** placeholder text */
  placeholder: PropTypes.string
}

Field.defaultProps = {
  theme,
  type: 'text'
}

export default Field