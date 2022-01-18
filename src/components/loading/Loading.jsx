import React from "react";
import styled from "styled-components";
import whiteAltitudeLines from "../../assets/images/white-altitude-lines.png"


export default function Loading({children}) {

   return (
      <StyledLoading bgImage={whiteAltitudeLines}>
         {children}
      </StyledLoading>
   )
}


const StyledLoading = styled.div`
  position: relative;
  background-image: url(${({bgImage}) => bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

`