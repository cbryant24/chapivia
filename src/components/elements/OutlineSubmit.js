import React from 'react';
import cleanElement from 'clean-element';
import styled from 'styled-components'
import { outlineButton } from './ButtonCSS';
import Button from './Button';
import theme, { filterProps, flexGrow } from './theme';
import PropTypes from 'prop-types';

const OutlineSubmit = Button.withComponent('input').extend`
  ${ outlineButton }
`

OutlineSubmit.displayName = 'Input'

OutlineSubmit.propTypes = {
  id: PropTypes.string,
}

OutlineSubmit.defaultProps = {
  theme,
}

export default OutlineSubmit;