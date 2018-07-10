import React from 'react'
import styled from 'styled-components'
import { fontSize, space, width, color, propTypes, minHeight } from 'styled-system'
import cleanElement from 'clean-element';
import theme, { filterProps } from './theme'
import PropTypes from 'prop-types'

const chevron = () => {
  const props = `xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'`
  const slate = '%23' + theme.colors.slate.replace('#', '')
  const pathProps = `fill='${slate}' d='M2 0L0 2h4zm0 5L0 3h4z'`
  return `%3Csvg ${props}%3E%3Cpath ${pathProps}/%3E%3C/svg%3E`
}

const Base = props => {
  const next = filterProps(props);
  return <input {...next} />
}

const Input = styled(cleanElement(Base))`
  appearance: none;
  display: ${props => props.display || 'block'};
  vertical-align: middle;
  max-width: 32rem;
  min-height: 3.6rem;
  line-height: inherit;
  font-family: inherit;
  background-color: transparent;
  border-radius: ${props => props.theme.radius};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.smoke};
  transition: ${props => props.theme.transition} box-shadow;
  ::placeholder {
    color: ${props => props.theme.colors.grey};
  }
  ::-ms-clear {
    display: none;
  }
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.info};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.blue[2]};
  }
  &[type='select'] {
    background: #fff url("data:image/svg+xml;charset=utf8,${chevron()}") no-repeat right .75rem center;
    background-size: .5rem;
  }
  ${fontSize} ${space} ${width} ${color} ${minHeight};
`

Input.displayName = 'Input'

Input.propTypes = {
  id: PropTypes.string,
  ...propTypes.fontSize,
  ...propTypes.space,
  ...propTypes.width,
  ...propTypes.color
}

Input.defaultProps = {
  theme,
  w: 1,
  m: 0,
  py: 1,
  px: 2,
  fontSize: `${theme.remSizes[16]}rem`,
  color: 'inherit',
  bg: 'transparent'
}

export const InputSelect = Input.withComponent('select');
export const InputTextarea = Input.withComponent('textarea');

export default Input