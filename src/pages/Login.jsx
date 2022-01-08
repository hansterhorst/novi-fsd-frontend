import React from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import {pageNavLinks} from "./pageNavLinks";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import InputField from "../components/form-inputs/InputField";
import {useForm} from "react-hook-form";
import LoginRegisterForm from "../components/form-inputs/LoginRegisterForm";
import InputPassword from "../components/form-inputs/InputPassword";


export default function Login() {

   const {register, handleSubmit} = useForm()


   function onSubmit(data) {
      console.log(data)
   }

   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container maxWidth={500} bgImage={whiteAltitudeLines} fullHeight={true}>

            <LoginRegisterForm title="Login" submitButtonTitle="Login" orButtonTitle="Register"
                               onSubmit={handleSubmit(onSubmit)}>

               <InputField labelTitle="* Email" type="email" name="email" register={register}/>

               <InputPassword labelTitle="* Wachtwoord" type="password" name="password"
                           register={register}/>

            </LoginRegisterForm>

         </Container>
      </Layout>
   )
}
