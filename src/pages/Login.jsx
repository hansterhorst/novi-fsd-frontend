import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Container from "../components/Container";
import StyledButton from "../styles/StyledButton";
import StyledLink from "../styles/StyledLink";
import {pageNavLinks} from "./pageNavLinks";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import InputField from "../components/form-inputs/InputField";
import {useForm} from "react-hook-form";


export default function Login() {

   const {register, handleSubmit} = useForm()


   function onSubmit(data) {
      console.log(data)
   }

   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container maxWidth={500} bgImage={whiteAltitudeLines} fullHeight={true}>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
               <h1>Login</h1>

               <InputField labelTitle="* Email" type="email" name="email" register={register}/>

               <InputField labelTitle="* Wachtwoord" type="password" name="password" register={register}/>

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

  .form-footer {
    display: flex;
    justify-content: space-between;

    label {
      color: ${({theme: {colors}}) => colors.green};
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

  .or-register {
    margin: 3rem 0;
    text-align: center;
  }

`