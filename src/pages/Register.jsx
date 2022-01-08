import React from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {pageNavLinks} from "./pageNavLinks";
import {useForm} from "react-hook-form";
import InputField from "../components/form-inputs/InputField";
import LoginRegisterForm from "../components/form-inputs/LoginRegisterForm";
import InputPassword from "../components/form-inputs/InputPassword";

export default function Register() {

   const {register, handleSubmit} = useForm()

   function onSubmit(data) {
      console.log(data)
   }


   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container bgImage={whiteAltitudeLines} fullHeight={true} maxWidth={500}>

            <LoginRegisterForm title="Register" submitButtonTitle="Register" orButtonTitle="Login"
                               onSubmit={handleSubmit(onSubmit)}>

               <InputField labelTitle="* Voornaam" name="firstname" register={register}/>

               <InputField labelTitle="* Achternaam" name="lastname" register={register}/>

               <InputField labelTitle="* E-mailadres" name="email" type="email"
                           register={register}/>

               <InputPassword labelTitle="* Wachtwoord" name="password" type="password"
                           register={register}/>

               <InputPassword labelTitle="* Bevestig wachtwoord" name="password2" type="password"
                           register={register}/>

            </LoginRegisterForm>

         </Container>
      </Layout>
   )
}
