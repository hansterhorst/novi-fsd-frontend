import React, {useContext, useEffect} from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import InputField from "../components/form-inputs/InputField";
import {useForm} from "react-hook-form";
import LoginRegisterForm from "../components/form-inputs/LoginRegisterForm";
import InputPassword from "../components/form-inputs/InputPassword";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth/AuthContext";
import {AlertContext} from "../context/alert/AlertContext";
import Alert from "../components/layout/Alert";


export default function Login() {

   const {authUser, loginUser, message} = useContext(AuthContext)
   const {setAlert} = useContext(AlertContext)

   const navigate = useNavigate()
   const {register, handleSubmit} = useForm()

   const navLinks = [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Register",
         url: "/register"
      }
   ]

   useEffect(() => {
      if (authUser.id) {
         navigate(`/users/user/${authUser.id}`)
      }
      // eslint-disable-next-line
   }, [authUser])

   useEffect(() => {

      switch (message.status) {
         case 401:
            setAlert("Email of wachtwoord niet correct", 401, true)
            return;
         case 404:
            setAlert(message.message, message.status, true)
            return
         default:
            return;
      }
      // eslint-disable-next-line
   }, [message])



   function login(data) {
      loginUser(data)
   }

   return (
      <Layout navLinks={navLinks}>
         <Container maxWidth={500} bgImage={whiteAltitudeLines} fullHeight={true}>

            <Alert/>

            <LoginRegisterForm title="Login" submitButtonTitle="Login" orButtonTitle="Register"
                               onSubmit={handleSubmit(login)}>

               <InputField labelTitle="* Email" type="email" name="usernameOrEmail"
                           register={register}/>

               <InputPassword labelTitle="* Wachtwoord" type="password" name="password"
                              register={register}/>

            </LoginRegisterForm>

         </Container>
      </Layout>
   )
}
