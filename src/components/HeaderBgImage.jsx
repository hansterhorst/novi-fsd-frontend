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
  aspect-ratio: 16/9;
  height: calc(100vw /16 * 9); // fallback safari browser
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
`