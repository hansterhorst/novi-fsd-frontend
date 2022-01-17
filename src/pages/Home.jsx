import React, {useContext, useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import HeaderBgImage from "../components/HeaderBgImage";
import Feature from "../components/Feature";
import styled from "styled-components";
import StyledTextLink from "../styles/StyledTextLink";
import wordCardImage from "../assets/images/world-card.png"
import ballonsImage from "../assets/images/balloons.png"
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import anthemImage from "../assets/images/anthem.png"
import axios from "axios";
import TravelstoriesGrid from "../components/travelstory/TravelstoriesGrid";
import Container from "../components/Container";
import StyledLink from "../styles/StyledLink";
import {PUBLIC_BASE_URL} from "../utils/constants";
import {AuthContext} from "../context/auth/AuthContext";

const featureData = [
   {
      text: {
         header: "Alles wat je nodig hebt voor een geweldig verhaal",
         body: "Schrijf jouw avonturen, deel prachtige foto's en inspireer ander personen."
      },
      image: wordCardImage
   },
   {
      text: {
         header: "Schrijf prachtige reisverhalen",
         body: "Ga op reis met TravelStories en deel jouw prachtige ervaringen met anderen."
      },
      image: ballonsImage
   }
]

export default function Home() {

   const [publicTravelstories, setPublicTravelstories] = useState([])
   const {isAuth, authUser} = useContext(AuthContext)

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
         image: authUser.profileImage
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

   async function getAllPublicTravelstories() {
      try {

         const response = await axios.get(`${PUBLIC_BASE_URL}/travelstories`)

         setPublicTravelstories(response.data)

      } catch (error) {
         console.log(error.response)
      }
   }

   useEffect(() => {
      getAllPublicTravelstories()
   }, [])


   return (
      <Layout navLinks={navLinks}>
         <StyledHome>

            <HeaderBgImage bgImage={anthemImage}>
               <Container>
                  <h2>Schrijf verhalen over jouw reizen en deel ze met andere personen</h2>
                  <div className="buttons">
                     <StyledLink to="/register">Register</StyledLink>
                     <StyledTextLink to="/login">or LOGIN</StyledTextLink>
                  </div>
               </Container>
            </HeaderBgImage>

         </StyledHome>

         <Container bgImage={whiteAltitudeLines}>
            <Feature data={featureData[0]}/>
         </Container>

         <Container bgImage={greenAltitudeLines}>
            <Feature data={featureData[1]} flexDirection="row-reverse"/>
         </Container>

         <TravelstoriesGrid dataArray={publicTravelstories} title="De laatste TravelStories"
                            maxWidth={1000}
                            bgImage={whiteAltitudeLines}/>
      </Layout>
   )
}

const StyledHome = styled.div`
  text-align: center;
  display: flex;


  h2 {
    font-size: 5rem;
    line-height: 1;
    padding: 10rem 0 2rem;
  }

  .buttons {
    display: inline-flex;
    flex-direction: column;
    margin: 2rem 0;
    row-gap: 1rem;
  }
`

