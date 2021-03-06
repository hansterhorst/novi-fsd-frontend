import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {Link} from "react-router-dom";
import TravelstoriesGrid from "../components/travelstory/TravelstoriesGrid";
import TravelstoryHeader from "../components/travelstory/TravelstoryHeader";
import {USERS_BASE_URL} from "../utils/constants";
import {AuthContext} from "../context/auth/AuthContext";
import awsGetProfileImage from "../utils/awsGetProfileImage";
import randomTravelstory from "../utils/randomTravelstory";


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
         image: awsGetProfileImage(authUser.id)
      },
   ]


   useEffect(() => {
      getTravelstories()
      // eslint-disable-next-line
   }, [])


   async function getTravelstories() {

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.get(`${USERS_BASE_URL}/travelstories`, config);

         setTravelstories(response.data)

         setTravelstory(randomTravelstory(response.data))
         
      } catch (error) {

         console.error(error.response);
      }
   }


   return (
      <Layout navLinks={navLinks}>
         <Link to={`/users/travelstories/${travelstory.id}`}>

            <TravelstoryHeader travelstory={travelstory}/>

         </Link>

         <TravelstoriesGrid dataArray={travelstories} bgImage={whiteAltitudeLines} maxWidth={1100}
                            title="Laatste TravelStories"/>
      </Layout>
   );
}


