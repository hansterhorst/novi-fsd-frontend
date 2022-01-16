import React, {useContext, useEffect} from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {useForm} from "react-hook-form";
import InputField from "../components/form-inputs/InputField";
import LoginRegisterForm from "../components/form-inputs/LoginRegisterForm";
import InputPassword from "../components/form-inputs/InputPassword";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth/AuthContext";

export default function Register() {

   const navigate = useNavigate()

   const {register, handleSubmit} = useForm()

   const {registerUser, message, authUser} = useContext(AuthContext)

   const navLinks = [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Login",
         url: "/login"
      }
   ]

   async function onSubmit(data) {
      registerUser(data)
   }


   useEffect(() => {
      if (message && message.status === 201) {
         navigate('/login')
      }
      // eslint-disable-next-line
   }, [message])


   useEffect(() => {
      console.log(authUser)
      if (authUser.id) {
         navigate(`/users/user/${authUser.id}`)
      }
      // eslint-disable-next-line
   }, [authUser])


   return (
      <Layout navLinks={navLinks}>
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
