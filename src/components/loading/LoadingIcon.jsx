import React, {useContext} from "react";
import styled from "styled-components";
import kompas from "../../assets/svg/kompas.svg"
import blades from "../../assets/svg/kompas-blades.svg"
import {AuthContext} from "../../context/auth/AuthContext";

export default function LoadingIcon({viewWidth=40}) {

   const {isLoading} = useContext(AuthContext)

   return (
      <StyledLoadingIcon isLoading={isLoading} viewWidth={viewWidth}>
         <img src={kompas} alt="TravelStories"/>
         <img className="rotated-needles" src={blades} alt="TravelStories"/>
      </StyledLoadingIcon>
   )
}

const StyledLoadingIcon = styled.div`
  position: relative;
  display: flex;

  img {
    width: ${({viewWidth}) => `${viewWidth}vw`};
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



