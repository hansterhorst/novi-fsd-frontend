import React, {useContext} from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import deadEnd from "../assets/images/dead-end.jpeg"
import styled from "styled-components";
import StyledTextLink from "../styles/StyledTextLink";
import awsGetProfileImage from "../utils/awsGetProfileImage";
import {AuthContext} from "../context/auth/AuthContext";

export default function PageNotFound() {

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

   return (
      <Layout navLinks={navLinks}>
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