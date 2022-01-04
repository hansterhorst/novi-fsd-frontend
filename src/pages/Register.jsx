import React from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import styled from "styled-components";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import StyledButton from "../styles/StyledButton";
import {pageNavLinks} from "./pageNavLinks";
import StyledLink from "../styles/StyledLink";
import {useForm} from "react-hook-form";
import InputField from "../components/form-inputs/InputField";

export default function Register() {

   const {register, handleSubmit} = useForm()

   function onSubmit(data) {
      console.log(data)
   }


   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container bgImage={whiteAltitudeLines} fullHeight={true} maxWidth={500}>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
               <h1>Register</h1>

               <InputField labelTitle="* Voornaam" name="firstname" register={register}/>

               <InputField labelTitle="* Achternaam" name="lastname" register={register}/>

               <InputField labelTitle="* E-mailadres" name="email" type="email"
                           register={register}/>

               <InputField labelTitle="* Wachtwoord" name="password" type="password"
                           register={register}/>

               <InputField labelTitle="* Bevestig wachtwoord" name="password2" type="password"
                           register={register}/>

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

  .form-footer {
    display: flex;
    justify-content: space-between;
    text-align: center;

    label {
      color: ${({theme: {colors}}) => colors.green};
      font-size: 1.6rem;
      font-weight: 500;
    }

  }

  .or-login {
    margin: 3rem 0;
    text-align: center;
  }

`