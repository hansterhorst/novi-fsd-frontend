import React, {useState} from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Container from "../components/Container";
import StyledButton from "../styles/StyledButton";
import StyledLink from "../styles/StyledLink";
import {pageNavLinks} from "./pageNavLinks";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"


export default function Login() {

   const [formData, setFormData] = useState({
      email: "",
      password: ""
   })
   const {email, password} = formData

   function handleOnChange(e) {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   function handleSubmit(e, formData) {
      e.preventDefault()

      console.log(formData)
   }

   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container maxWidth={500} bgImage={whiteAltitudeLines} fullHeight={true}>
            <StyledForm onSubmit={e => handleSubmit(e, formData)}>
               <h1>Login</h1>
               <label>* Email
                  <input type="email" name="email" value={email}
                         onChange={e => handleOnChange(e)}/>
               </label>
               <label>* Password
                  <input type="password" name="password" value={password}
                         onChange={e => handleOnChange(e)}/>
               </label>
               <div className="form-footer">
                  <label>* Verplichte velden</label>
                  <StyledButton type="onsubmit">Login</StyledButton>
               </div>
               <div className="or-register">
                  <StyledLink to="/register">or REGISTER</StyledLink>
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

    p {
      font-size: 1.6rem;
    }
  }

  .or-register {
    margin: 3rem 0;
    text-align: center;
  }

`