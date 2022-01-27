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
import Alert from "../components/layout/Alert";
import {AlertContext} from "../context/alert/AlertContext";

export default function Register() {

   const navigate = useNavigate()

   // react hook form
   const defaultValues = {email: "", firstname: "", lastname: "", password: "", password2: ""}
   const {register, handleSubmit} = useForm({defaultValues})

   const {registerUser, message, authUser, clearErrors} = useContext(AuthContext)
   const {setAlert} = useContext(AlertContext)

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


   useEffect(() => {
      switch (message.status) {
         case 201:
            setAlert([message.message], message.status)
            clearErrors()
            navigate('/login')
            return
         case 400:
            setAlert(message.message, message.status, true)
            clearErrors()
            return
         default:
            clearErrors()
            return
      }
      // eslint-disable-next-line
   }, [message.status])


   useEffect(() => {
      if (authUser.id) {
         navigate(`/users/user/${authUser.id}`)
      }
      // eslint-disable-next-line
   }, [authUser])


   async function onSubmit(data) {

      if (data.password !== data.password2) {
         setAlert(["Wachtwoorden komen niet overeen"], 500, true)
      } else {
         registerUser(data)
      }
   }


   return (
      <Layout navLinks={navLinks}>
         <Container bgImage={whiteAltitudeLines} fullHeight={true} maxWidth={500}>

            <Alert/>

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
