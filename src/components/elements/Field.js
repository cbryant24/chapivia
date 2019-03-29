import React from 'react'
import Label from './Label'
import Flex from './Flex'
import Text from './Text'
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
  &:before { content: '— '; }
`

const Field = ({ data: { name, type, placeholder, label, error}, flexStyle, inputStyle, ...props }) => {
  const Component =
    {
      select: InputSelect,
      slider: Slider,
      textarea: InputTextarea
    }[type] || Input
  return (
    <Flex {...flexStyle}>
      <Label for={name} id={name} >
        {label}
      </Label>
      <Flex align="center" mb="2px" wrap>
        {error && <Error children={error} />}
      </Flex>
      <Component  name={name} type={type} placeholder={placeholder} {...props} {...inputStyle}/>
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
  error: PropTypes.string,
  /** placeholder text */
  placeholder: PropTypes.string
}

Field.defaultProps = {
  theme,
  type: 'text'
}

export default Field