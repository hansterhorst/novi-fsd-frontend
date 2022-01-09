import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import dateToLocalString from "../utils/dateToLocalString";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import grayAltitudeLines from "../assets/images/gray-altitude-lines.png"
import StyledButton from "../styles/StyledButton";
import ProfileImage from "../components/ProfileImage";
import StyledHeader from "../styles/StyledHeader";
import {pageNavLinks} from "./pageNavLinks";
import TextArea from "../components/form-inputs/TextArea";
import {useForm} from "react-hook-form";
import StyledLink from "../styles/StyledLink";


export default function Travelstory() {

   const [travelstory, setTravelstory] = useState([])
   const {id} = useParams()
   const navigate = useNavigate()

   const {register, handleSubmit} = useForm()

   function onSubmit(data) {
      console.log(data)
   }

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

   const {title, imageUrl, article, country, tripType, tripDate, author, userId} = travelstory
   const isAuth = true

   return (
      <Layout navLinks={pageNavLinks.user}>

         <StyledHeader bgImage={imageUrl}/>

         <Container bgImage={grayAltitudeLines}>
            <StyledArticleHeader>

               <div className="article-header-titles">
                  <h2>{country}</h2>
                  <h1>{title}</h1>
                  <h3>{tripType}</h3>
                  <h4>{dateToLocalString(tripDate)}</h4>
               </div>

               <div className="article-header-profile">
                  <Link to={`/user/${userId}`}>
                     <ProfileImage squareSize={150} profileImage={imageUrl}/>
                     <h3>{author}</h3>
                  </Link>
                  {isAuth ?
                     <StyledButton onClick={() => console.log("Like Story")}>Like
                        Story</StyledButton>
                     :
                     <StyledButton onClick={() => console.log("Like Story")}> ❤ 10
                        Likes</StyledButton>
                  }
               </div>

            </StyledArticleHeader>
         </Container>

         <Container bgImage={whiteAltitudeLines} maxWidth={800}>
            <StyledArticle>
               <p>{article}</p>
               <div className="buttons">
                  <StyledButton onClick={() => navigate(-1)}>terug</StyledButton>
                  <StyledLink to={`/travelstory/edit/${travelstory.id}`}>✏️ Edit</StyledLink>
               </div>
            </StyledArticle>
         </Container>

         <Container bgImage={greenAltitudeLines} maxWidth={800}>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
               <h3>Houd uw reactie beschaafd, constructief en inclusief, anders wordt uw reactie
                  verwijderd.</h3>

               <TextArea labelTitle="Reactie" name="comment" register={register} height={100}/>

               <div className="form-footer">
                  <StyledButton type="onsubmit">Verstuur reactie</StyledButton>
               </div>
            </StyledForm>

            <StyledComments>
               <ProfileImage profileImage={imageUrl}/>
               <div className="comment">
                  <div className="comment-profile">
                     <h3>Hans ter Horst </h3>
                     <h2>•</h2>
                     <p>12 december 2021</p>
                  </div>
                  <p>Het was vandaag een verrassende mooie dag. Normaal hou ik helemaal niet van
                     asfalt fietsen maar heb vandaag toch wel genoten. Morgen het IJsselmeer
                     over</p>
               </div>
            </StyledComments>
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

    a {
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

const StyledForm = styled.form`
  padding: 5rem 0 0;

  h3 {
    color: ${({theme: {colors}}) => colors.red};
    font-weight: bold;
    margin: 2rem 0;
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    margin: 2rem 0;
  }
`

const StyledComments = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 3rem 0;

  .comment {
    padding: 0 1rem;
    width: 90%;

    p {
      font-size: 1.6rem;
    }

    .comment-profile {
      display: flex;
      align-items: center;
      gap: 1rem;

      h3 {
        color: ${({theme: {colors}}) => colors.red};
        font-weight: 900;
      }
    }
  }
`