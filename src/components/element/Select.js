import React from 'react';
import { InputSelect } from './Input'

const Select = ({inputData: {display, value, data, }, ...props}) => {
  const addOptions = () => {
    return (data.map( item => <option value={ item[value] || item }>{ item[display] || item } </option>))
  }
  return (
    <InputSelect
      {...props}
      color={props.color || 'black'}
    >
      <option value=''></option>
      { addOptions() }
    </InputSelect>
  )
}

export default Select;