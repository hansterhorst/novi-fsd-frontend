import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import Container from "../components/Container";
import {pageNavLinks} from "./pageNavLinks";
import {Link} from "react-router-dom";
import TravelstoriesGrid from "../components/travelstory/TravelstoriesGrid";


export default function Travelstories() {

   const [travelstories, setTravelstories] = useState([])

   const [travelstory, setTravelstory] = useState({})

   const fetchTravelstories = async () => {

      try {
         const response = await axios.get('http://localhost:8080/api/v1/travelstories/');

         setTravelstories(response.data)

         randomTravelstory(response.data)

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

   function randomTravelstory(array) {
      const index = Math.floor(Math.random() * array.length)
      setTravelstory(array[index])
   }

   const {id, imageUrl, country, title, author} = travelstory

   return (
      <Layout navLinks={pageNavLinks.user}>
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

            <TravelstoriesGrid dataArray={travelstories} title="Laatste TravelStories"/>

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
`

