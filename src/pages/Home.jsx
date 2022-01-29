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
import awsGetProfileImage from "../utils/awsGetProfileImage";

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
      getAllPublicTravelstories()
   }, [])


   async function getAllPublicTravelstories() {
      try {

         const response = await axios.get(`${PUBLIC_BASE_URL}/travelstories`)

         setPublicTravelstories(response.data)

      } catch (error) {
         console.log(error.response)
      }
   }


   return (
      <Layout navLinks={navLinks}>

         <HeaderBgImage bgImage={anthemImage}>
            <StyledHome>
               <Container>
                  <h1>Schrijf verhalen over jouw reizen en deel ze met andere personen</h1>
                  <div className="buttons">
                     <StyledLink to="/register">Register</StyledLink>
                     <StyledTextLink to="/login">of LOGIN</StyledTextLink>
                  </div>
               </Container>
            </StyledHome>
         </HeaderBgImage>


         <Container bgImage={whiteAltitudeLines}>
            <Feature data={featureData[0]}/>
         </Container>

         <Container bgImage={greenAltitudeLines}>
            <Feature data={featureData[1]} flexDirection="row-reverse"/>
         </Container>

         <TravelstoriesGrid dataArray={publicTravelstories} title="De laatste TravelStories"
                            maxWidth={1100}
                            bgImage={whiteAltitudeLines}/>
      </Layout>
   )
}

const StyledHome = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;


  h1 {
    line-height: 1;
  }

  .buttons {
    display: inline-flex;
    flex-direction: column;
    margin: 2rem 0;
    row-gap: 1rem;
  }

  
  @media only screen and ${({theme: {breakpoints}}) => breakpoints.md} {
    h1 {
      font-size: 3rem;
      padding: 0;
    }

    .buttons {
      margin: 1.5rem 0;
    }
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.sm} {
    h1 {
      font-size: 2.5rem;
      padding: 0;
    }
    
    .buttons {
      margin: 1.5rem 0;
    }
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.xs} {
    h1 {
      font-size: 2rem;
      padding: 0;
    }

    .buttons {
      margin: 1rem 0;
    }
  }
`

