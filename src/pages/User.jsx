import React, {useContext, useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import grayAltitudeLines from '../assets/images/gray-altitude-lines.png'
import whiteAltitudeLines from '../assets/images/white-altitude-lines.png'
import anthem from "../assets/images/anthem.png"
import styled from "styled-components";
import StyledButton from "../styles/StyledButton";
import axios from "axios";
import Container from "../components/Container";
import ProfileImage from "../components/ProfileImage";
import {useNavigate, useParams} from "react-router-dom";
import StyledLink from "../styles/StyledLink";
import TravelstoriesGrid from "../components/travelstory/TravelstoriesGrid";
import StyledHeader from "../styles/StyledHeader";
import {AuthContext} from "../context/auth/AuthContext";
import getTotalLikesFromUserTravelstories from "../utils/getTotalLikesUserTravelstories";
import userAlreadyFollowingUser from "../utils/userAlreadyFollowing";
import {USERS_BASE_URL} from "../utils/constants";
import awsGetProfileImage from "../utils/awsGetProfileImage";
import awsGetTravelstoryImage from "../utils/awsGetTravelstoryImage";


export default function User() {

   const {authUser, isAuth, logoutUser, roles} = useContext(AuthContext)

   const [user, setUser] = useState({})
   const [travelstories, setTravelstories] = useState([])
   const [travelstory, setTravelstory] = useState({})
   const [follows, setFollowers] = useState([])

   //   react-router
   const {userId} = useParams()
   const navigate = useNavigate()

   const navLinks = isAuth && roles.includes("ROLE_ADMIN") ? [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Travelstories",
         url: "/users/travelstories"
      },
      {
         title: "Admin",
         url: "/admin",
      },
      {
         title: "Logout",
         url: "/",
         cta: logoutUser
      }
   ] : (user.id === authUser.id) ? [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Travelstories",
         url: "/users/travelstories"
      },
      {
         title: "Logout",
         url: "/",
         cta: logoutUser
      }
   ] : [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Travelstories",
         url: "/users/travelstories"
      },
      {
         title: "Logout",
         url: "/",
         cta: logoutUser
      }
   ]


   useEffect(() => {
      if (authUser.bio !== null) {
         getTravelstories()
         getAllUserTravelstories(userId)
      } else {
         navigate(`/users/user/${userId}/edit`)
      }
      // eslint-disable-next-line
   }, [])


   useEffect(() => {
      isUserTheSameAuthUser(user, authUser)
      // eslint-disable-next-line
   }, [authUser.id])


   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       randomTravelstory(travelstories)
   //    }, 5000);
   //    return () => clearInterval(interval)
   //    // eslint-disable-next-line
   // }, [travelstory])


   async function getTravelstories() {

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.get(`${USERS_BASE_URL}/user/${userId}`, config);

         setUser(response.data)

         await isUserTheSameAuthUser(response.data, authUser)

         await getAllFollows()

      } catch (error) {
         console.error(error.response);
      }
   }


   async function handleFollowUser(authUserId) {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      if (userAlreadyFollowingUser(follows, authUserId)) {

         try {

            const response = await axios.delete(`${USERS_BASE_URL}/${userId}/follow/${authUser.id}`, config);

            if (response.status === 200) await getAllFollows(userId)

         } catch (error) {
            console.error(error);
         }

      } else {

         try {
            const response = await axios.post(`${USERS_BASE_URL}/${userId}/follow/${authUser.id}`, null, config);

            if (response.status === 201) await getAllFollows(userId)

         } catch (error) {
            console.error(error);
         }
      }
   }


   async function getAllUserTravelstories(userId) {

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }
         const response = await axios.get(`${USERS_BASE_URL}/travelstories/user/${userId}`, config)

         if (response.status === 200) {

            setTravelstories(response.data)
            await randomTravelstory(response.data)

         }
      } catch (error) {
         console.log(error.response)
      }
   }


   async function getAllFollows() {

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.get(`${USERS_BASE_URL}/${userId}/follow`, config)
         if (response.status === 200) {
            setFollowers(response.data)
         }

      } catch (error) {
         console.log(error.response)
      }
   }


   function isUserTheSameAuthUser(user, authUser) {
      if (user.email === authUser.email) {
         setUser({...authUser, isUser: true})
      }
   }

   function randomTravelstory(array) {
      const index = Math.floor(Math.random() * array.length)
      setTravelstory(array[index])
   }


   return (
      <Layout navLinks={navLinks}>

         <StyledUser>

            {travelstory ? <StyledHeader bgImage={awsGetTravelstoryImage(userId, travelstory.id)}/> :
               <StyledHeader bgImage={anthem}/>}

            <Container maxWidth={750} bgImage={grayAltitudeLines}>

               <div className="profile-container">
                  <div className="profile-image">
                     <ProfileImage squareSize={150} profileImage={awsGetProfileImage(userId)}/>
                  </div>
               </div>

               <div className="profile-bio">
                  <h2>{`${user.firstname} ${user.lastname}`}</h2>
                  <h3>{user.city} • {user.country}</h3>
                  <p>{user.bio}</p>
               </div>

               <div className="details">
                  <label>Travelstories
                     <h3>{travelstories && travelstories.length}</h3>
                  </label>
                  <label>Volgers
                     <h3>{follows && follows.length}</h3>
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
                        {/* CREATE TRAVELSTORY */}
                        {!user.isUser && <StyledButton onClick={() => console.log("Follow")}>Volg
                           mij</StyledButton>}
                        <StyledLink to={`/users/travelstories/new/`}>✏️
                           TravelStory</StyledLink>

                        {/* EDIT PROFILE*/}
                        {user.isUser && <StyledLink to={`/users/user/${user.id}/edit`}>
                           <ProfileImage squareSize={30} profileImage={awsGetProfileImage(authUser.id)}/>
                           edit
                        </StyledLink>}
                     </>

                     :

                     // follow user
                     <StyledButton onClick={() => handleFollowUser(authUser.id)}>
                        {userAlreadyFollowingUser(follows, authUser.id) ? `Niet volgen` : "Volg mij"}
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
      text-transform: uppercase;
    }
  }
`