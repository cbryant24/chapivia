import React, { Fragment } from 'react'
import { ThemeProvider as Root, css, createGlobalStyle } from 'styled-components'
import PropTypes from 'prop-types'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-weight: inherit;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  table {
    border-collapse: collapse;
  }

  html {
    min-height: 100%;
    min-width: 100%;
    font-size: 62.5%;
  }

  ul {
    list-style: none;
  }

  body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'VT323';
    color: #ffffff;
    line-height: 1.5;
    letter-spacing: 1px;
    position: relative;
    height: 100%;
    max-height: 100%;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  a {
    color: currentColor;
    text-decoration: none;
  }
  textarea {
    resize: none;
  }
`;

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