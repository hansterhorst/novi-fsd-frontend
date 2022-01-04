import {createGlobalStyle} from "styled-components";

const StyledTypography = createGlobalStyle`

  html, body {
    font-size: 10px;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  h1, h2, h3, h4 {
    color: ${({theme: {colors}}) => colors.white};
    line-height: 1.2;
  }
  
  h1, h2, h3 {
    text-transform: uppercase;
  }
  
  h1{
    font-size: 4rem;
    font-weight: 900;
  }
  
  h2{
    font-size: 3rem;
    font-weight: 600;
  }
  
  h3{
    font-weight: 500;
    font-size: 2rem;
  }
  
  h4{
    font-size: 1.6rem;
    font-weight: 700;
    font-style: italic;
  }
  
  h4, p{
    font-family: "Merriweather", serif;
  }
  
  p{
    font-size: 1.8rem;
    line-height: 1.5;
    color: ${({theme: {colors}}) => colors.black};
  }

`


export default StyledTypography