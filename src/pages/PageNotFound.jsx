import React from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import deadEnd from "../assets/images/dead-end.jpeg"
import styled from "styled-components";
import {pageNavLinks} from "./pageNavLinks";

export default function PageNotFound() {

   return (
      <Layout navLinks={pageNavLinks.home}>
         <StyledPageNotFound>
            <Container fullHeight={true} bgImage={deadEnd}>
            </Container>
         </StyledPageNotFound>
      </Layout>
   )
}

const StyledPageNotFound = styled.section`

`