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

  h1 {
    font-size: 4rem;
    font-weight: 900;
  }

  h2 {
    font-size: 3rem;
    font-weight: 600;
  }

  h3 {
    font-size: 2rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.8rem;
    font-weight: 700;
    font-style: italic;
  }

  h4, p {
    font-family: "Merriweather", serif;
  }

  p {
    font-size: 1.8rem;
    line-height: 1.5;
    color: ${({theme: {colors}}) => colors.black};
  }

  a, label {
    font-size: 1.6rem;
    color: ${({theme: {colors}}) => colors.darkGreen};
  }


  @media only screen and ${({theme: {breakpoints}}) => breakpoints.md} {

    h1 {
      font-size: 3.5rem;
    }

    h2 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 2rem;
    }


  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.sm} {

    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.75rem;
    }

    h4, p {
      font-size: 1.8rem;
    }

    a {
      font-size: 1.5rem;
    }

  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.xs} {

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 1.5rem;
    }


  }

`

export default StyledTypography