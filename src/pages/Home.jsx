import React from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {pageNavLinks} from "./pageNavLinks";

export default function Home() {

   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container fullHeight={true} bgImage={whiteAltitudeLines}>
         <h1>Home</h1>
         </Container>
      </Layout>
   )
}