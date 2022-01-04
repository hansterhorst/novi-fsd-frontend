import React from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"

export default function Home() {

   return (
      <Layout>
         <Container fullHeight={true} bgImage={whiteAltitudeLines}>
         <h1>Home</h1>
         </Container>
      </Layout>
   )
}