import React, {useContext, useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import grayAltitudeLines from '../assets/images/gray-altitude-lines.png'
import whiteAltitudeLines from '../assets/images/white-altitude-lines.png'
import styled from "styled-components";
import StyledButton from "../styles/StyledButton";
import axios from "axios";
import Container from "../components/Container";
import ProfileImage from "../components/ProfileImage";
import {useParams} from "react-router-dom";
import {pageNavLinks} from "./pageNavLinks";
import StyledLink from "../styles/StyledLink";
import TravelstoriesGrid from "../components/travelstory/TravelstoriesGrid";
import StyledHeader from "../styles/StyledHeader";
import {AuthContext} from "../context/auth/AuthContext";
import getTotalLikesFromUserTravelstories from "../utils/getTotalLikesUserTravelstories";
import userAlreadyFollowingUser from "../utils/userAlreadyFollowing";


export default function User() {

   const {authUser} = useContext(AuthContext)

   const [user, setUser] = useState({})
   const [travelstories, setTravelstories] = useState([])
   const [travelstory, setTravelstory] = useState({})
   const [follows, setFollowers] = useState([])

   let {userId} = useParams()


   const getTravelstories = async () => {

      try {
         const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);

         setUser(response.data)
         setTravelstories(response.data.travelstories)

         await randomTravelstory(response.data.travelstories)

         await loadUser(response.data, authUser)

         await getAllFollows()

      } catch (error) {
         console.error(error);
      }
   }


   async function handleFollowUser(authUserId) {

      console.log(follows)

      if (userAlreadyFollowingUser(follows, authUserId)) {

         try {
            const response = await axios.delete(`http://localhost:8080/api/v1/users/${userId}/follow/${authUser.userId}`);

            console.log("DELETE")
            if (response.status === 200) await getAllFollows()

         } catch (error) {
            console.error(error);
         }

      } else {

         try {
            const response = await axios.post(`http://localhost:8080/api/v1/users/${userId}/follow/${authUser.userId}`);

            console.log("POST")
            if (response.status === 201) await getAllFollows()

         } catch (error) {
            console.error(error);
         }

      }
   }

   async function getAllFollows() {
      try {
         const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}/follow`)
         if (response.status === 200) setFollowers(response.data)
      } catch (error) {
         console.log(error.response)
      }
   }

   /*
   * USE_EFFECTS
   * */

   useEffect(() => {
      getTravelstories()
      // eslint-disable-next-line
   }, [])


   useEffect(() => {
      loadUser(user, authUser)
      // eslint-disable-next-line
   }, [authUser])


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


   function loadUser(user, authUser) {
      if (user.email === authUser.email) {
         setUser({...authUser, isUser: true})
      }
   }

   function randomTravelstory(array) {
      const index = Math.floor(Math.random() * array.length)
      setTravelstory(array[index])
   }

   const {imageUrl} = travelstory

   const {firstname, lastname, profileImage} = user


   return (
      <Layout navLinks={pageNavLinks.user}>
         <StyledUser>

            <StyledHeader bgImage={imageUrl}/>

            <Container maxWidth={750} bgImage={grayAltitudeLines}>

               <div className="profile-container">
                  <div className="profile-image">
                     <ProfileImage squareSize={150}
                                   profileImage={profileImage}/>
                  </div>
               </div>

               <div className="profile-bio">

                  <h2>{`${firstname} ${lastname}`}</h2>
                  <h3>Delden • Nederland</h3>
                  <p>{user.bio}</p>
                  <p>I’m originally from sleepy Suffolk in the UK. I’m a crazy dreamer and with an
                     insatiable desire for travel and adventure who could never settle for an
                     ordinary
                     life or conform with the norm.</p>
               </div>

               <div className="details">
                  <label>Travelstories
                     <h3>{travelstories.length}</h3>
                  </label>
                  <label>Volgers
                     <h3>{follows.length}</h3>
                  </label>
                  <label>Likes
                     <h3>{getTotalLikesFromUserTravelstories(travelstories)}</h3>
                  </label>
                  <label>images
                     <h3>10</h3>
                  </label>
               </div>

               <div className="profile-buttons">

                  {/* if user is the same as authUser */}
                  {user.isUser ?
                     <>
                        {!user.isUser && <StyledButton onClick={() => console.log("Follow")}>Volg
                           mij</StyledButton>}
                        <StyledLink to={`/travelstory/new/${userId}`}>✏️ TravelStory</StyledLink>
                        <StyledLink to={`/user/${user.id}`}>
                           <ProfileImage squareSize={30} profileImage={profileImage}/>
                           edit
                        </StyledLink>
                     </>
                     :
                     // follow user
                     <StyledButton onClick={() => handleFollowUser(authUser.userId)}>
                        {userAlreadyFollowingUser(follows, authUser.userId) ? `❤ ${follows.length} volgers` : "Volg mij"}
                     </StyledButton>

                  }
               </div>

            </Container>

            <TravelstoriesGrid title="Mijn TravelStories" dataArray={travelstories} maxWidth={1000}
                               bgImage={whiteAltitudeLines}/>

         </StyledUser>
      </Layout>
   )
}


const StyledUser = styled.div`

  .profile-container {
    position: relative;
    height: 100px;
    display: flex;
    justify-content: center;
  }

  .profile-image {
    position: absolute;
    top: -70px;
  }

  .profile-bio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    h2 {
      color: ${({theme: {colors}}) => colors.red};
    }

    h3 {
      color: ${({theme: {colors}}) => colors.green};
    }

    p {
      color: ${({theme: {colors}}) => colors.white};
      margin: 2rem 0 1rem;
    }

  }

  .profile-buttons {
    display: flex;
    justify-content: center;
    column-gap: 2rem;
    padding: 2rem 0;
  }

  .details {
    display: flex;
    justify-content: space-around;

    label {
      font-size: 1.8rem;
      font-weight: 900;
      color: ${({theme: {colors}}) => colors.red};
      text-align: center;
      margin: 1rem 0 1rem;
    }
  }
`