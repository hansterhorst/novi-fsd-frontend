import React from "react";
import styled from "styled-components";
import kompas from "../../assets/svg/kompas.svg"
import blades from "../../assets/svg/kompas-blades.svg"

export default function LoadingIcon() {

   return (
      <StyledLoadingIcon>
         <img src={kompas} alt="TravelStories"/>
         <img className="rotated-needles" src={blades} alt="TravelStories"/>
      </StyledLoadingIcon>
   )
}

const StyledLoadingIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  img {
    width: 40%;
  }

  .rotated-needles {
    position: absolute;

    @media (prefers-reduced-motion: no-preference) {
      animation: rotated-needles-animation infinite 3s linear;
    }

    @keyframes rotated-needles-animation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`



