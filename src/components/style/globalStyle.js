import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
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

    // This defines what 1rem is
    font-size: 50%; //1 rem = 10px; 10px/16px = 62.5%

    @media screen and (min-width: 768px) { // width < 1200?
        font-size: 56.25%; //1 rem = 9px, 9/16 = 50%
    }

    @media screen and (min-width: 1012px)  { // width < 900?
        font-size: 62.5%; //1 rem = 8px, 8/16 = 50%
    }
    
    @media screen and (min-width: 1280px) {
        font-size: 75%; //1rem = 12, 12/16
    }
  }

  ul {
    list-style: none;
  }

  body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Press Start 2P', cursive;;
    font-weight: normal;
    font-style: normal;
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

  h1 {
    font-size: 3.2em;
  }

  h2 {
    font-size: 2.6em;
  }

  h3 {
    font-size: 2.2em;
  }

  h4 {
    font-size: 2em;
  }
`;