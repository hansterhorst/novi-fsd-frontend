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
import {pageNavLinks} from "./pageNavLinks";
import StyledLink from "../styles/StyledLink";
import {AuthContext} from "../context/auth/AuthContext";
import Commit from "../components/Commit";


export default function Travelstory() {

   const {authUser} = useContext(AuthContext)

   const [travelstory, setTravelstory] = useState([])
   const {id} = useParams()
   const navigate = useNavigate()


   const getTravelstoryById = async () => {
      try {
         const response = await axios.get(`http://localhost:8080/api/v1/travelstories/${id}`)
         setTravelstory(response.data)
      } catch (error) {
         console.error(error);
      }
   }


   useEffect(() => {
      getTravelstoryById()
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

   const {isAuth} = authUser

   return (

      <Layout navLinks={pageNavLinks.user}>

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
                        <Link to={`/user/${userId}`}>
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
                  {isAuth && (travelstory.userId !== authUser.userId) ?
                     <StyledButton onClick={() => console.log("Like Story")}>Like
                        Story</StyledButton>
                     :
                     <StyledButton onClick={() => console.log("Like Story")}> ❤ 10
                        Likes</StyledButton>
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
                  {(isAuth && (authUser.userId === travelstory.userId)) &&
                     <StyledLink to={`/travelstory/edit/${travelstory.id}`}>✏️
                        Edit</StyledLink>
                  }

               </div>
            </StyledArticle>
         </Container>

         {/* COMMENTS */}
         <Container bgImage={greenAltitudeLines} maxWidth={800}>
            <Commit travelstoryId={id}/>
         </Container>

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