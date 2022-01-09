import React, {useEffect, useState} from "react";
import TravelstoryCard from "./TravelstoryCard";
import styled from "styled-components";


export default function TravelstoriesGrid({dataArray, title}) {

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
      <StyledTravelstoriesGrid>
         <h1>{title}</h1>
         {travelstories.map((rowsArray, index) => (
            <StyledThreeColumnsGrid key={index} index={index}>
               {rowsArray.map(travelstory => (
                  <TravelstoryCard key={travelstory.id} travelstory={travelstory}/>
               ))}
            </StyledThreeColumnsGrid>
         ))}
      </StyledTravelstoriesGrid>
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
  grid-template-columns: ${({index}) => index % 2 === 0 ? `2fr 1fr 1fr` : `1fr 1fr 2fr`};
  grid-auto-flow: column;
`