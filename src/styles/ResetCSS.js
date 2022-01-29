import {createGlobalStyle} from "styled-components";


const ResetCSS = createGlobalStyle`

  #root, #__next {
    isolation: isolate;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  a {
    text-decoration: none;
  }

  a:active, a:focus {
    outline: none;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  fieldset, img {
    border: 0;
  }

  address, caption, cite, code, dfn, em, strong, th, var {
    font-style: normal;
    font-weight: 400;
  }

  ol, ul {
    list-style: none;
  }

  caption, th {
    text-align: left;
  }

  q:before, q:after {
    content: '';
  }

  abbr, acronym {
    border: 0;
  }

`
export default ResetCSS