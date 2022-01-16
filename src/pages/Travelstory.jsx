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


export default function Travelstory() {

   const {authUser, isAuth} = useContext(AuthContext)

   const [travelstory, setTravelstory] = useState([])
   const [likes, setLikes] = useState([])
   const {id} = useParams()
   const navigate = useNavigate()

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
         title: "Profile",
         url: `/users/user/${authUser.id}`
      },
   ]

   const getTravelstoryById = async () => {

      if (isAuth) {
         try {
            const response = await axios.get(`${USERS_BASE_URL}/travelstories/${id}`,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
               }
            )
            setTravelstory(response.data)
         } catch (error) {
            console.error(error.response);
         }

      } else {

         try {
            console.log("PUBLIC")
            const response = await axios.get(`${PUBLIC_BASE_URL}/travelstories/${id}`)
            setTravelstory(response.data)
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
            const response = await axios.delete(`${USERS_BASE_URL}/travelstories/${id}/likes/user/${authUserId}`, config
            )
            if (response.status === 200) await getAllTravelstoryLikes()

         } catch (error) {
            console.log(error.response)
         }

      } else {

         try {
            const response = await axios.post(`${USERS_BASE_URL}/travelstories/${id}/likes/user/${authUserId}`, null,
               config
            )
            if (response.status === 201) await getAllTravelstoryLikes()

         } catch (error) {
            console.log(error.response)
         }
      }
   }

   async function getAllTravelstoryLikes() {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      if (isAuth) {
         try {
            const response = await axios.get(`${USERS_BASE_URL}/travelstories/${id}/likes`,
               config
            )
            setLikes(response.data)
         } catch (error) {
            console.log(error.response)
         }
      }
   }


   useEffect(() => {
      getTravelstoryById()
      getAllTravelstoryLikes()
      // eslint-disable-next-line
   }, [])


   const {
      title,
      imageUrl,
      article,
      country,
      tripType,
      tripDate,
      author,
      userId,
      authorImage
   } = travelstory


   return (

      <Layout navLinks={navLinks}>

         <StyledHeader bgImage={imageUrl}/>

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
                           <ProfileImage squareSize={150} profileImage={authorImage}/>
                           <h3>{author}</h3>
                        </Link>
                     </div>
                     :
                     <div className="user-link">
                        <ProfileImage squareSize={150} profileImage={authorImage}/>
                        <h3>{author}</h3>
                     </div>
                  }

                  {/* if user is login and user is not the owner */}
                  {isAuth && (travelstory.userId !== authUser.id) ?

                     <StyledButton type="button" onClick={() => handleLikeSubmit(authUser.id)}>

                        {likes && userAlreadyLikedTravelstory(likes, authUser.id) ? `Unlike Story` : "Like Story"}

                     </StyledButton>
                     :
                     <div className="like-count">{`❤ ${likes.length} Likes`}</div>
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

                  {/* user is login and user is the owner */}
                  {(isAuth && (authUser.id === travelstory.userId)) &&
                     <StyledLink to={`/users/travelstories/edit/${travelstory.id}`}>✏️
                        Edit</StyledLink>
                  }

               </div>
            </StyledArticle>
         </Container>

         {/* COMMENTS */}
         {isAuth &&
            <Container bgImage={greenAltitudeLines} maxWidth={800}>
               <Commit travelstoryId={id}/>
            </Container>
         }

      </Layout>
   )
}

const StyledArticleHeader = styled.div`
  position: relative;
  padding: 7rem 0;

  .article-header-titles {
    width: calc(100% - 200px);

    h1, h2, h3 {
      color: ${({theme}) => theme.colors.red};
      text-transform: uppercase;
    }

    h4 {
      color: ${({theme}) => theme.colors.green};
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