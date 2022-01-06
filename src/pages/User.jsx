import React, {useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import HeaderBGImage from "../components/HeaderBGImage";
import altitudeLines from '../assets/images/white-altitude-lines.png'
import grayAltitudeLines from '../assets/images/gray-altitude-lines.png'
import styled from "styled-components";
import StyledButton from "../styles/StyledButton";
import axios from "axios";
import TravelstoryCard from "../components/TravelstoryCard";
import Container from "../components/Container";
import ProfileImage from "../components/ProfileImage";
import {useParams} from "react-router-dom";
import {pageNavLinks} from "./pageNavLinks";
import randomArrayIndexNumber from "../utils/randomArrayIndexNumber";
import StyledLink from "../styles/StyledLink";


export default function User() {

   const [user, setUser] = useState({})
   let {userId} = useParams()


   const getTravelstories = async () => {

      try {
         const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
         setUser(response.data)

      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      getTravelstories()
      // eslint-disable-next-line
   }, [])

   const {firstname, lastname, travelstories} = user

   const image = travelstories && travelstories[randomArrayIndexNumber(travelstories)]

   return (
      <Layout navLinks={pageNavLinks.user}>
         <StyledUser>
            <HeaderBGImage bgImage={image && image.imageUrl}/>
            <Container maxWidth={750} bgImage={grayAltitudeLines}>
               <div className="profile-container">
                  <div className="profile-image">
                     <ProfileImage squareSize={150}
                                   profileImage={image && image.imageUrl}/>
                  </div>
               </div>
               <div className="profile-bio">
                  <h2>{`${firstname} ${lastname}`}</h2>
                  <h3>Delden • Nederland</h3>
                  <p>I’m originally from sleepy Suffolk in the UK. I’m a crazy dreamer and with an
                     insatiable desire for travel and adventure who could never settle for an
                     ordinary
                     life or conform with the norm.</p>
               </div>
               <div className="details">
                  <label>Travelstories
                     <h3>10</h3>
                  </label>
                  <label>Followers
                     <h3>10</h3>
                  </label>
                  <label>Likes
                     <h3>10</h3>
                  </label>
                  <label>images
                     <h3>10</h3>
                  </label>
               </div>
               <div className="profile-buttons">
                  <StyledButton onClick={() => console.log("Follow")}>Volg mij</StyledButton>
                  <StyledLink to={`/travelstory/new`}>✏️ TravelStory</StyledLink>
                  <StyledLink to={`/user/${user.id}`}>
                     <ProfileImage squareSize={30} profileImage={image && image.imageUrl}/>
                     edit
                  </StyledLink>
               </div>

            </Container>
            <Container bgImage={altitudeLines} maxWidth={1000}>
               <h1>Mijn TravelStories</h1>
               <StyledGrid>
                  {travelstories && travelstories.map((story) => (
                     <TravelstoryCard key={story.id} travelstory={story}/>
                  ))}
               </StyledGrid>
            </Container>
         </StyledUser>
      </Layout>
   )
}


const StyledUser = styled.div`

  h1 {
    color: ${({theme: {colors}}) => colors.red};
    text-align: center;
    padding: 7rem 0 3rem;
  }

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
    padding: 4rem 0 ;
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

const StyledGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 7rem;
`