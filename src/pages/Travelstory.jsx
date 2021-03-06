import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import dateToLocalString from "../utils/dateToLocalString";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import grayAltitudeLines from "../assets/images/gray-altitude-lines.png"
import greenAltitudeLines from "../assets/images/green-altitude-lines.png";
import StyledButton from "../styles/StyledButton";
import ProfileImage from "../components/ProfileImage";
import StyledHeader from "../styles/StyledHeader";
import StyledLink from "../styles/StyledLink";
import {AuthContext} from "../context/auth/AuthContext";
import Commit from "../components/Commit";
import userAlreadyLikedTravelstory from "../utils/userAlreadyLikedTravelstory";
import {
   PUBLIC_BASE_URL,
   USERS_BASE_URL,
} from "../utils/constants";
import awsGetProfileImage from "../utils/awsGetProfileImage";
import awsGetTravelstoryImage from "../utils/awsGetTravelstoryImage";


export default function Travelstory() {

   const {authUser, isAuth} = useContext(AuthContext)

   const [travelstory, setTravelstory] = useState([])
   const [likes, setLikes] = useState([])

   // react-router-dom
   const {travelstoryId} = useParams()
   const navigate = useNavigate()

   const navLinks = isAuth ? [
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
   ] : [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Register",
         url: "/register"
      },
      {
         title: "Login",
         url: "/login"
      },
   ]


   useEffect(() => {
      getTravelstoryById()
      getAllTravelstoryLikes()
      // eslint-disable-next-line
   }, [])


   const getTravelstoryById = async () => {

      if (isAuth) {
         try {

            const config = {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               },
            }

            const response = await axios.get(`${USERS_BASE_URL}/travelstories/${travelstoryId}`, config)
            await setTravelstory(response.data)

         } catch (error) {
            console.error(error.response);
         }

      } else {

         try {
            const response = await axios.get(`${PUBLIC_BASE_URL}/travelstories/${travelstoryId}`)
            await setTravelstory(response.data)

         } catch (error) {
            console.error(error.response);
         }
      }
   }

   async function handleLikeSubmit(authUserId) {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      if (isAuth && userAlreadyLikedTravelstory(likes, authUserId)) {

         try {
            const response = await axios.delete(`${USERS_BASE_URL}/travelstories/${travelstoryId}/likes/user/${authUserId}`, config)

            if (response.status === 200) {
               await getAllTravelstoryLikes()
            }

         } catch (error) {
            console.log(error.response)
         }

      } else {

         try {

            const response = await axios.post(`${USERS_BASE_URL}/travelstories/${travelstoryId}/likes/user/${authUserId}`, null, config)

            if (response.status === 201) {
               await getAllTravelstoryLikes()
            }

         } catch (error) {
            console.log(error.response)
         }
      }
   }

   async function getAllTravelstoryLikes() {

      if (isAuth) {
         try {

            const config = {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               }
            }

            const response = await axios.get(`${USERS_BASE_URL}/travelstories/${travelstoryId}/likes`, config)

            setLikes(response.data)

         } catch (error) {
            console.log(error.response)
         }
      }
   }


   const {
      title,
      article,
      country,
      tripType,
      tripDate,
      author,
      userId,
   } = travelstory


   return (

      <Layout navLinks={navLinks}>

         <StyledHeader bgImage={awsGetTravelstoryImage(travelstory.userId, travelstory.id)}/>

         {/* ARTICLE DETAILS*/}
         <Container bgImage={grayAltitudeLines}>
            <StyledArticleHeader>

               <div className="article-header-titles">
                  <h2>{country}</h2>
                  <h1>{title}</h1>
                  <h3>{tripType}</h3>
                  <h4>{dateToLocalString(tripDate)}</h4>
               </div>

               <div className="article-header-profile">

                  {isAuth ?
                     <div className="user-link">
                        <Link to={`/users/user/${userId}`}>
                           <ProfileImage squareSize={150} profileImage={userId && awsGetProfileImage(userId)}/>
                           <h3>{author}</h3>
                        </Link>
                     </div>
                     :
                     /* REDIRECT PUBLIC USERS */
                     <div className="user-link">
                        <Link to={`/login`}>
                           <ProfileImage squareSize={150} profileImage={userId && awsGetProfileImage(userId)}/>
                           <h3>{author}</h3>
                        </Link>
                     </div>
                  }

                  {/* if user is login and user is not the owner */}
                  {isAuth && (travelstory.userId !== authUser.id) ?

                     <StyledButton type="button" onClick={() => handleLikeSubmit(authUser.id)}>

                        {likes && userAlreadyLikedTravelstory(likes, authUser.id) ? `Unlike Story` : "Like Story"}

                     </StyledButton>
                     :
                     <div className="like-count">{`??? ${likes.length} Likes`}</div>
                  }

               </div>

            </StyledArticleHeader>
         </Container>

         {/* ARTICLE */}
         <Container bgImage={whiteAltitudeLines} maxWidth={800}>
            <StyledArticle>

               <p>{article}</p>

               <div className="buttons">

                  <StyledButton onClick={() => navigate(-1)}>terug</StyledButton>

                  {/* EDIT ARTICLE user is login and user is the owner */}
                  {(isAuth && (authUser.id === travelstory.userId)) &&
                     <StyledLink to={`/users/travelstories/edit/${travelstory.id}`}>??????
                        Edit</StyledLink>
                  }

               </div>
            </StyledArticle>
         </Container>

         {/* COMMENTS */}
         {isAuth &&
            <Container bgImage={greenAltitudeLines} maxWidth={800}>
               <Commit travelstoryId={travelstoryId}/>
            </Container>
         }

      </Layout>
   )
}

const StyledArticleHeader = styled.section`
  position: relative;
  padding: 7rem 0;

  .article-header-titles {
    width: calc(100% - 200px);

    h1, h2, h3 {
      color: ${({theme: {colors}}) => colors.red};
      text-transform: uppercase;
    }

    h4 {
      color: ${({theme: {colors}}) => colors.green};
    }

  }

  .article-header-profile {
    position: absolute;
    top: -70px;
    right: 0;
    text-align: center;

    .user-link, a {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;

      h3 {
        color: ${({theme: {colors}}) => colors.green};
        font-weight: 700;
        margin: 1rem 0 2rem;
        width: 200px;
        text-align: center;
      }

      &:hover {

        h3 {
          text-decoration: underline;
          color: ${({theme: {colors}}) => colors.lightGray};
        }
      }
    }

    .like-count {
      font-size: 1.6rem;
      font-weight: bold;
      color: ${({theme: {colors}}) => colors.white};
      text-transform: uppercase;
      padding: 1rem 1.6rem 0.8rem;
      background-color: ${({theme: {colors}}) => colors.red};
      border: 3px solid ${({theme: {colors}}) => colors.red};
      display: inline-block;
    }
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.sm} {

    display: flex;
    flex-direction: column-reverse;
    padding: 0;

    .article-header-titles {
      position: relative;
      width: 100%;
      text-align: center;
      top: -40px;
    }

    .article-header-profile {
      position: relative;

      h3 {
        font-size: 2rem;
      }
    }
  }

`

const StyledArticle = styled.article`
  padding: 5rem 0;

  p {
    white-space: pre-wrap;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }

`