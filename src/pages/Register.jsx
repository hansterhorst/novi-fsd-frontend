import React, {useState} from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import styled from "styled-components";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import StyledButton from "../styles/StyledButton";
import {pageNavLinks} from "./pageNavLinks";
import StyledLink from "../styles/StyledLink";

export default function Register() {

   const [newUser, setNewUser] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: ""
   })
   const {firstname, lastname, email, password, password2} = newUser

   function handleOnChange(e) {
      setNewUser({
         ...newUser,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit(e, newUser) {
      e.preventDefault()

      console.log(newUser)
   }


   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container bgImage={whiteAltitudeLines} fullHeight={true} maxWidth={500}>
            <StyledForm onSubmit={e => handleSubmit(e, newUser)}>
               <h1>Register</h1>
               <label>* Voornaam
                  <input type="text" name="firstname" value={firstname}
                         onChange={e => handleOnChange(e)}/>
               </label>

               <label>* Achternaam
                  <input type="text" name="lastname" value={lastname}
                         onChange={e => handleOnChange(e)}/>
               </label>

               <label>* E-mailadres
                  <input type="email" name="email" value={email}
                         onChange={e => handleOnChange(e)}/>
               </label>

               <label>* Wachtwoord
                  <input type="password" name="password" value={password}
                         onChange={e => handleOnChange(e)}/>
               </label>

               <label>* Bevestig wachtwoord
                  <input type="password" name="password2" value={password2}
                         onChange={e => handleOnChange(e)}/>
               </label>

               <div className="form-footer">
                  <label>* Verplichte velden</label>
                  <StyledButton type="onsubmit">Register</StyledButton>
               </div>
               <div className="or-login">
                  <StyledLink to="/login">or LOGIN</StyledLink>
               </div>
            </StyledForm>
         </Container>
      </Layout>
   )
}


const StyledForm = styled.form`
  padding: 3rem 0;


  h1 {
    color: ${({theme: {colors}}) => colors.red};
    margin: 2rem 0;
  }

  label {
    color: ${({theme: {colors}}) => colors.green};
    font-size: 1.6rem;
    font-weight: 500;
  }

  input {
    padding: 0.8rem 1.6rem;
    font-family: "Merriweather", serif;
    font-size: 1.8rem;
    color: black;
    border: 3px solid ${({theme: {colors}}) => colors.green};
    width: 100%;
    background-color: ${({theme: {colors}}) => colors.white};
    margin-bottom: 1.5rem;
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    text-align: center;

    p {
      font-size: 1.6rem;
    }

  }

  .or-login {
    margin: 3rem 0;
    text-align: center;
  }

`