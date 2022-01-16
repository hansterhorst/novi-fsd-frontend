import React, {useContext, useEffect} from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import {pageNavLinks} from "./pageNavLinks";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import InputField from "../components/form-inputs/InputField";
import {useForm} from "react-hook-form";
import LoginRegisterForm from "../components/form-inputs/LoginRegisterForm";
import InputPassword from "../components/form-inputs/InputPassword";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth/AuthContext";


export default function Login() {

   const {authUser, loginUser} = useContext(AuthContext)
   const navigate = useNavigate()

   const {register, handleSubmit} = useForm()

   function login(data) {
      loginUser(data)
   }

   useEffect(() => {
      console.log(authUser)
      if (authUser.id) {
         navigate(`/users/user/${authUser.id}`)
      }
      // eslint-disable-next-line
   }, [authUser])


   return (
      <Layout navLinks={pageNavLinks.home}>
         <Container maxWidth={500} bgImage={whiteAltitudeLines} fullHeight={true}>

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
