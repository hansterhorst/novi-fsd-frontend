import React from "react";
import Layout from "../components/layout/Layout";
import HeaderBGImage from "../components/HeaderBGImage";
import Feature from "../components/Feature";
import styled from "styled-components";
import StyledLink from "../styles/StyledLink";
import StyledNavLink from "../styles/StyledNavLink";
import wordCardImage from "../assets/images/world-card.png"
import ballonsImage from "../assets/images/balloons.png"
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import anthemImage from "../assets/images/anthem.png"
import {pageNavLinks} from "./pageNavLinks";


export default function Home() {

   const featureData = [
      {
         text: {
            header: "Everything you need to create stories",
            body: "Write your adventures, add beautiful photos and share your stories to inspire others."
         },
         image: wordCardImage
      },
      {
         text: {
            header: "Tell inspiring travel stories",
            body: "Hit the road with TravelStories, and share your adventures with others."
         },
         image: ballonsImage
      }
   ]

   return (
      <Layout navLinks={pageNavLinks.home}>
         <HeaderBGImage bgImage={anthemImage}>
            <StyledHome>
               <h1>Create stories about your trips and share those with you friends</h1>
               <div className="buttons">
                  <StyledNavLink to="/register">Register</StyledNavLink>
                  <StyledLink to="/login">or LOGIN</StyledLink>
               </div>
            </StyledHome>
         </HeaderBGImage>
         <Feature data={featureData[0]}/>
         <Feature data={featureData[1]} flexDirection="row-reverse" bgImage={greenAltitudeLines}/>
      </Layout>
   )
}

const StyledHome = styled.div`
  text-align: center;


  h1 {
    font-size: 5rem;
    line-height: 1;
    margin: 10rem 0 2rem;
  }

  h2 {
    margin: 0 0 4rem;
  }

  .buttons {
    display: inline-flex;
    flex-direction: column;
    margin: 2rem 0;
    row-gap: 1rem;

    // overwrite StyledNavLink
    a:first-child {
      background-color: ${({theme: {colors}}) => colors.red};

      &:hover {
        color: ${({theme: {colors}}) => colors.red};
        background-color: ${({theme: {colors}}) => colors.white};
      }
    }
  }
`

