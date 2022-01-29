import React from "react";
import styled from "styled-components";
import whiteAltitudeLines from "../../assets/images/white-altitude-lines.png"
import LoadingIcon from "./LoadingIcon";


export default function Loading({fullscreen = false}) {

   return (
      <StyledLoading bgImage={whiteAltitudeLines} fullscreen={fullscreen}>
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
  ${({fullscreen}) => fullscreen ? `height: 100vh; width: 100vw;` : `height: 100%; width: 100%;`});

  display: flex;
  align-items: center;
  justify-content: center;

`