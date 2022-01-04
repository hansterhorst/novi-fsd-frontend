import React from "react";
import Container from "./Container";
import styled from "styled-components";

export default function HeaderBGImage({children, bgImage}) {

   return (
      <StyledHeaderBDImage bgImage={bgImage}>
         <Container maxWidth={800}>
            {children}
         </Container>
      </StyledHeaderBDImage>
   )

}

const StyledHeaderBDImage = styled.header`
  background: rgba(0, 0, 0, 0.3) url(${({bgImage}) => bgImage}) no-repeat center;
  background-blend-mode: multiply;
  background-size: cover;
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
`