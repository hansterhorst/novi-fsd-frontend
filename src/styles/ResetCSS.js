import {createGlobalStyle} from "styled-components";


const ResetCSS = createGlobalStyle`

  fieldset,img{
    border:0;
  }

  address,caption,cite,code,dfn,em,strong,th,var{
    font-style:normal;
    font-weight:400;
  }

  ol,ul{
    list-style:none;
  }

  caption,th{
    text-align:left;
  }

  q:before,q:after{
    content:'';
  }

  abbr,acronym{
    border:0;
  }

  a{
    text-decoration:none;
  }

  a:active,a:focus{
    outline:none;
  }

  /*
    Use a more-intuitive box-sizing model.
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /*
    Remove default margin
  */
  * {
    margin: 0;
  }

  /*
    Allow percentage-based heights in the application
  */
  html, body {
    height: 100%;
  }

  /*
    Typographic tweaks!
  */
  body {
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /*
    Improve media defaults
  */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /*
    Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }

  /*
    Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /*
    Create a root stacking context
  */
  #root, #__next {
    isolation: isolate;
  }

`

export default ResetCSS