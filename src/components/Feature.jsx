import React from "react";
import styled from "styled-components";

export default function Feature({data: {text, image}, flexDirection}) {
   return (
      <StyledFeature flexDirection={flexDirection}>
         <div className="text-side">
            <h2>{text.header}</h2>
            <p>{text.body}</p>
         </div>
         <div className="image-side">
            <img src={image} alt="map of the world"/>
         </div>
      </StyledFeature>
   )
}

const StyledFeature = styled.article`

  display: flex;
  align-items: center;
  flex-direction: ${({flexDirection}) => flexDirection};
  margin: 0 auto;
  padding: 5rem 0;
  column-gap: 2rem;

  .text-side {
    text-align: center;
    width: 50%;

    h2 {
      font-size: 3rem;
      color: ${({theme}) => theme.colors.red};
      margin: 2rem 0;
    }
  }

  .image-side {
    width: 50%;
  }

`