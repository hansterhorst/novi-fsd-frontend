import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import dateToLocalString from "../utils/dateToLocalString";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import StyledButton from "../styles/StyledButton";
import ProfileImage from "../components/ProfileImage";
import StyledLink from "../styles/StyledLink";
import StyledHeader from "../styles/StyledHeader";
import {pageNavLinks} from "./pageNavLinks";


export default function Travelstory() {

   const [formData, setFormData] = useState("")
   let [travelstory, setTravelstory] = useState([])
   let {id} = useParams()

   const getTravelstoryById = async () => {
      try {
         const response = await axios.get(`http://localhost:8080/api/v1/travelstories/${id}`)
         setTravelstory(response.data)
         console.log(response)

      } catch (error) {
         console.error(error);
      }
   }

   function handleOnChange(e) {
      setFormData({
         [e.target.name]: e.target.value
      })
   }

   function handleOnSubmit(e) {
      e.preventDefault()
      console.log(formData)
   }


   useEffect(() => {
      getTravelstoryById()
      // eslint-disable-next-line
   }, [])


   const {title, imageUrl, article, country, tripType, tripDate, author, userId} = travelstory

   return (
      <Layout navLinks={pageNavLinks.user}>
         <StyledHeader bgImage={imageUrl}/>
         <Container bgColor={({theme}) => theme.colors.darkGray}>
            <StyledArticleHeader>
               <div className="profile-image">
                  <ProfileImage/>
                  <Link to={`/user/${userId}`}>
                     <h3>{author}</h3>
                  </Link>
                  <StyledButton> ❤ 10 Likes</StyledButton>
               </div>
               <div className="article-header-titles">
                  <h2>{country}</h2>
                  <h1>{title}</h1>
                  <h3>{tripType}</h3>
                  <h4>{dateToLocalString(tripDate)}</h4>
               </div>
            </StyledArticleHeader>
         </Container>
         <Container bgImage={whiteAltitudeLines} maxWidth={900}>
            <StyledArticle>
               <p>{article}</p>
               <StyledLink to={`/travelstories`}>terug</StyledLink>
            </StyledArticle>
         </Container>

         <Container bgImage={greenAltitudeLines} maxWidth={800}>

            <StyledForm onSubmit={(e) => handleOnSubmit(e)}>
               <h3>Please keep the conversation civil, constructive, and inclusive, or your comment
                  will be removed.</h3>
               <label>Comment
                  <textarea name="comment" value={formData.comment}
                            onChange={e => handleOnChange(e)} wrap="hard"/>
               </label>
               <div className="form-footer">
                  <StyledButton type="onsubmit">Verstuur reactie</StyledButton>
               </div>
            </StyledForm>

            <StyledComment>
               <div className="profile-image">
                  <ProfileImage/>
               </div>
               <div className="comment">
                  <div className="details">
                     <h3>Hans ter Horst </h3>
                     <h2>•</h2>
                     <p>12 december 2021</p>
                  </div>
                  <p>Het was vandaag een verrassende mooie dag. Normaal hou ik helemaal niet van
                     asfalt fietsen maar heb vandaag toch wel genoten. Morgen het IJsselmeer
                     over</p>
               </div>
            </StyledComment>
         </Container>
      </Layout>
   )
}

const StyledArticleHeader = styled.div`
  position: relative;
  padding: 7rem 0;


  .article-header-titles {
    width: calc(100% - 150px);

    h1, h2, h3 {
      color: ${({theme}) => theme.colors.red};
      text-transform: uppercase;
    }

    h4 {
      color: ${({theme}) => theme.colors.green};
    }

    h2 {
      font-size: 2rem;
    }
  }

  .profile-image {
    position: absolute;
    top: -70px;
    right: 0;
    height: 150px;
    width: 150px;
    text-align: center;

    h3 {
      color: ${({theme: {colors}}) => colors.green};
      font-size: 2rem;
      font-weight: bold;
      margin: 1rem 0 2rem;
    }
  }

`

const StyledArticle = styled.article`

  padding: 5rem 0;

  p {
    white-space: pre-wrap;
    margin-bottom: 2rem;
  }
`

const StyledForm = styled.form`
  padding: 5rem 0;

  h3 {
    color: ${({theme: {colors}}) => colors.red};
    font-weight: bold;
    margin: 2rem 0;
  }

  label {
    color: ${({theme: {colors}}) => colors.white};
    font-size: 1.6rem;
  }


  textarea {
    padding: 0.8rem 1.6rem;
    font-family: "Merriweather", serif;
    font-size: 1.8rem;
    color: ${({theme: {colors}}) => colors.black};
    border: 3px solid ${({theme: {colors}}) => colors.green};
    width: 100%;
    background-color: ${({theme: {colors}}) => colors.white};
    margin-bottom: 1.5rem;
    display: block;
    height: 100px;
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
  }


`

const StyledComment = styled.div`
  display: flex;
  align-items: flex-start;

  .profile-image {
    height: 100px;
    width: 100px;
  }

  .comment {
    padding: 0 1rem;
    width: 90%;

    p {
      font-size: 1.6rem;
    }

    .details {
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