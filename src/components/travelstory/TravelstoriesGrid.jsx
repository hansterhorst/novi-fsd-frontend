import React, {useEffect, useState} from "react";
import TravelstoryCard from "./TravelstoryCard";
import styled from "styled-components";
import Container from "../Container";


export default function TravelstoriesGrid({dataArray, title, maxWidth = 1000, bgImage}) {

   const [travelstories, setTravelstories] = useState([])


   function threeColumnsGridArray(dataArray) {
      let gridArray = []
      let rowArray = []

      // eslint-disable-next-line array-callback-return
      dataArray.map((story, index) => {
         rowArray.push(story)
         if ((index + 1) % 3 === 0) {
            gridArray.push(rowArray)
            rowArray = []
         }
         if (index + 1 === dataArray.length) gridArray.push(rowArray)
      })
      return gridArray
   }

   useEffect(() => {
      setTravelstories(threeColumnsGridArray(dataArray))
   }, [dataArray])

   return (
      <Container maxWidth={maxWidth} bgImage={bgImage}>
         <StyledTravelstoriesGrid>
            <h1>{title}</h1>
            {travelstories.map((rowsArray, index) => (
               <StyledThreeColumnsGrid key={index} index={index}>
                  {rowsArray.map(travelstory => (
                     <TravelstoryCard key={travelstory.id} travelstory={travelstory} maxWidth={maxWidth}/>
                  ))}
               </StyledThreeColumnsGrid>
            ))}
         </StyledTravelstoriesGrid>
      </Container>
   )
}

const StyledTravelstoriesGrid = styled.div`

  padding: 5rem 0;

  h1 {
    color: ${({theme: {colors}}) => colors.red};
    text-align: center;
  }
`

const StyledThreeColumnsGrid = styled.main`
  display: grid;
  grid-template-columns: ${({index}) => index % 2 === 0 ? `50% 25% 25%` : `25% 25% 50%`};
    justify-content: center;
  //grid-auto-flow: column;
  
  
  @media only screen and ${({theme: {breakpoints}})=> breakpoints.md} {

    grid-template-columns: 33% 33% 33%;

    //grid-auto-flow: column;

  }


  @media only screen and ${({theme: {breakpoints}})=> breakpoints.sm} {
    
    grid-template-columns: 100%;
    grid-auto-flow: row;
  }
  
`