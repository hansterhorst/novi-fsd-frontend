import React from "react";
import styled from "styled-components";
import whiteAltitudeLines from "../../assets/images/white-altitude-lines.png"
import LoadingIcon from "./LoadingIcon";


export default function Loading() {

   return (
      <StyledLoading bgImage={whiteAltitudeLines}>
         <LoadingIcon/>
      </StyledLoading>
   )
}


const StyledLoading = styled.div`
  position: relative;
  background-image: url(${({bgImage}) => bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

`