import React from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import deadEnd from "../assets/images/dead-end.jpeg"
import styled from "styled-components";
import {pageNavLinks} from "./pageNavLinks";
import StyledTextLink from "../styles/StyledTextLink";

export default function PageNotFound() {

   return (
      <Layout navLinks={pageNavLinks.home}>
         <StyledPageNotFound>
            <Container fullHeight={true} bgImage={deadEnd}>
               <h1>Oepss, verkeerde afslag</h1>
               <StyledTextLink to="/">Home</StyledTextLink>
            </Container>
         </StyledPageNotFound>
      </Layout>
   )
}

const StyledPageNotFound = styled.section`
  text-align: center;
  background-position: center;

  h1, a {
    padding-top: 15rem;
    color: ${({theme: {colors}}) => colors.white};
  }

`