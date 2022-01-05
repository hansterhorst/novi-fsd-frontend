import React from "react";
import styled from "styled-components";

export default function Container({
                                     children,
                                     bgColor,
                                     bgImage,
                                     maxWidth = 1000,
                                     fullHeight = false
                                  }) {

   function randomBackgroundPosition() {
      const backgroundPositions = [`top`, `bottom`, `left`, `right`, `center`]
      const index = Math.floor(Math.random() * backgroundPositions.length)
      return backgroundPositions[index]
   }

   return (
      <ContainerStyled bgColor={bgColor} bgImage={bgImage} maxWidth={maxWidth} fullHeight={fullHeight}
                       randomPosition={randomBackgroundPosition}>
         <div className="container">
            {children}
         </div>
      </ContainerStyled>
   )
}

const ContainerStyled = styled.div`
  background-image: url(${({bgImage}) => bgImage});
  background-position: ${({randomPosition}) => randomPosition};
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${({bgColor}) => bgColor};

  ${({fullHeight}) => fullHeight && `
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 153px) 
  `};


  .container {
    max-width: ${({maxWidth}) => `${maxWidth}px`};
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
  }
`