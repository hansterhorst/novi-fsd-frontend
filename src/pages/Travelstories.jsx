import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import TravelstoryCard from "../components/TravelstoryCard";
import Container from "../components/Container";
import {pageNavLinks} from "./pageNavLinks";
import {Link} from "react-router-dom";


export default function Travelstories() {

   const [travelstories, setTravelstories] = useState([])

   const [travelstory, setTravelstory] = useState({})

   const fetchTravelstories = async () => {

      try {
         const response = await axios.get('http://localhost:8080/api/v1/travelstories/');
         const gridArray = threeColumnsGridArray(response.data)
         setTravelstories(gridArray)

         randomTravelstory(gridArray)

      } catch (error) {
         console.error(error);
      }
   }


   /*
   * USE_EFFECTS
   * */

   useEffect(() => {
      fetchTravelstories()
      // eslint-disable-next-line
   }, [])


   useEffect(() => {
      const interval = setInterval(() => {
         randomTravelstory(travelstories)
      }, 5000);
      return () => clearInterval(interval)
      // eslint-disable-next-line
   }, [travelstory])



   /*
   * METHODES
   * */

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


   function randomTravelstory(array) {

      let newArray = []

      array.map(rows => {
         return rows.map(story => {
            return newArray.push(story)
         })
      })

      const index = Math.floor(Math.random() * newArray.length)
      setTravelstory(newArray[index])
   }

   const {id,imageUrl, country, title, author} = travelstory

   return (
      <Layout navLinks={pageNavLinks.home}>
         <Link to={`/travelstory/${id}`}>
            <StyledHeader bgImage={imageUrl}>
               <div>
                  <h2>{country}</h2>
                  <h1>{title}</h1>
                  <h4>by {author}</h4>
               </div>
            </StyledHeader>
         </Link>
         <Container bgImage={whiteAltitudeLines} maxWidth={1200}>
            <h1>Travel Stories</h1>
            {travelstories && travelstories.map((rowsArray, index) => (
               <StyledThreeColumnsGrid key={index} index={index}>
                  {rowsArray.map(travelstory => (
                     <TravelstoryCard key={travelstory.id} travelstory={travelstory}/>
                  ))}
               </StyledThreeColumnsGrid>
            ))}
         </Container>
      </Layout>
   );
}

const StyledHeader = styled.header`
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

  h1 {
    color: ${({theme: {colors}}) => colors.white};
  }

  h4 {
    font-size: 2rem;
  }
`;

const StyledThreeColumnsGrid = styled.main`
  display: grid;
  grid-template-columns: ${({index}) => index % 2 === 0 ? `2fr 1fr 1fr` : `1fr 1fr 2fr`};
  grid-auto-flow: column;
`
