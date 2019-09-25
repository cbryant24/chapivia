import React, { Fragment } from 'react'
import { ThemeProvider as Root } from 'styled-components'
import PropTypes from 'prop-types'

const ThemeProvider = ({ theme, ...props }) => {
  // if (webfonts) injectGlobal([], fontsCss)

  return (
    <Root
      theme={theme}
      {...props}
      children={<Fragment>{props.children}</Fragment>}
    />
  )
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  // webfonts: PropTypes.bool
}

ThemeProvider.defaultProps = {
  // theme,
  webfonts: false
}

export default ThemeProvider

// throw new Error(
//   "An injectGlobal usage was converted to createGlobalStyles via codemod but needs to be hooked up. See https://www.styled-components.com/docs/api#createglobalstyle for instructions."
// );