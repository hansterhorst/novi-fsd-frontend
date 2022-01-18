import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {Link} from "react-router-dom";
import TravelstoriesGrid from "../components/travelstory/TravelstoriesGrid";
import TravelstoryHeader from "../components/travelstory/TravelstoryHeader";
import {USERS_BASE_URL} from "../utils/constants";
import {AuthContext} from "../context/auth/AuthContext";


export default function Travelstories() {

   const {isAuth, authUser} = useContext(AuthContext)
   const [travelstories, setTravelstories] = useState([])

   const [travelstory, setTravelstory] = useState({})

   const navLinks = isAuth && [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Travelstories",
         url: "/users/travelstories"
      },
      {
         title: authUser.firstname,
         url: `/users/user/${authUser.id}`,
         image: authUser.profileImage
      },
   ]

   const fetchTravelstories = async () => {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }


      try {
         const response = await axios.get(`${USERS_BASE_URL}/travelstories`, config);

         setTravelstories(response.data)

         randomTravelstory(response.data)

      } catch (error) {
         console.error(error.response);
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
      <Layout navLinks={navLinks}>
         <Link to={`/users/travelstory/${id}`}>

            <TravelstoryHeader bgImage={imageUrl} country={country} title={title} author={author}/>

         </Link>

         <TravelstoriesGrid dataArray={travelstories} bgImage={whiteAltitudeLines} maxWidth={1200}
                            title="Laatste TravelStories"/>

      </Layout>
   );
}


