import React, {useEffect, useState} from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {pageNavLinks} from "./pageNavLinks";
import {Link} from "react-router-dom";
import TravelstoriesGrid from "../components/travelstory/TravelstoriesGrid";
import TravelstoryHeader from "../components/travelstory/TravelstoryHeader";


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

            <TravelstoryHeader bgImage={imageUrl} country={country} title={title} author={author}/>

         </Link>

         <TravelstoriesGrid dataArray={travelstories} bgImage={whiteAltitudeLines} maxWidth={1200}
                            title="Laatste TravelStories"/>

      </Layout>
   );
}


