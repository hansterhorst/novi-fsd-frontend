import React from "react";
import styled from "styled-components";

export default function HeaderBgImage({children, bgImage}) {

   return (
      <StyledHeaderBgImage bgImage={bgImage}>
         {children}
      </StyledHeaderBgImage>
   )

}

const StyledHeaderBgImage = styled.header`
  background: rgba(0, 0, 0, 0.3) url(${({bgImage}) => bgImage}) no-repeat center;
  background-blend-mode: multiply;
  background-size: cover;
  width: 100%;
  height: calc(100vw / 16 * 9); // fallback safari browser
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.sm} {
    height: calc(100vw / 4 * 3); // fallback safari browser
    aspect-ratio: 4/3;
  }

`