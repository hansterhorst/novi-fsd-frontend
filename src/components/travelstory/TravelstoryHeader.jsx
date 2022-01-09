import React from "react";
import styled from "styled-components";

export default function TravelstoryHeader({bgImage, country, title, author}) {

   return (
      <StyledTravelstoryHeader bgImage={bgImage}>
         <div>
            <h3>{country}</h3>
            <h2>{title}</h2>
            <h4>{author}</h4>
         </div>
      </StyledTravelstoryHeader>
   )

}

const StyledTravelstoryHeader = styled.header`
  background: rgba(0, 0, 0, 0.3) url(${({bgImage}) => bgImage}) no-repeat center;
  background-blend-mode: multiply;
  background-size: cover;
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  text-align: center;
  

  h2 {
    font-size: 4rem;
    font-weight: 900;
  }
  
  h3{
    font-size: 3rem;
  }

  h4 {
    font-size: 3rem;
  }
`