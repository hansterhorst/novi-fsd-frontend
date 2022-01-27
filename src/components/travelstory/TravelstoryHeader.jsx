import React from "react";
import styled from "styled-components";
import awsGetTravelstoryImage from "../../utils/awsGetTravelstoryImage";

export default function TravelstoryHeader({travelstory}) {

   return (
      <StyledTravelstoryHeader bgImage={awsGetTravelstoryImage(travelstory.userId, travelstory.id)}>
         <div>
            <h3>{travelstory.country}</h3>
            <h2>{travelstory.title}</h2>
            <h4>{travelstory.author}</h4>
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
  height: calc(100vw / 16 * 9); // fallback safari browser
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  text-align: center;


  h2 {
    font-size: 4rem;
    font-weight: 900;
  }

  h3 {
    font-size: 3rem;
  }

  h4 {
    font-size: 3rem;
  }
`