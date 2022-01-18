import React, {useContext, useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import Container from "../components/Container"
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {AuthContext} from "../context/auth/AuthContext";
import InputField from "../components/form-inputs/InputField";
import {useForm} from "react-hook-form";
import TextArea from "../components/form-inputs/TextArea";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {USERS_BASE_URL} from "../utils/constants";
import StyledTextButton from "../styles/StyledTextButton";
import SubmitForm from "../components/form-inputs/SubmitForm";


export default function EditProfile() {

   const {authUser, loadUser, logoutUser} = useContext(AuthContext)
   const navigate = useNavigate()
   const [userData, setUserData] = useState({})
   const {id} = useParams()

   // React Form Hook
   const defaultValues = {firstname: "", lastname: "", email: "", city: "", country: "", bio: "",}
   const {register, handleSubmit, reset} = useForm(defaultValues)


   const navLinks = [
      {title: "Home", url: "/"},
      {title: authUser.firstname, url: `/users/user/${authUser.id}`, image: authUser.profileImage}
   ]

   async function getUserById() {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {

         const response = await axios.get(`${USERS_BASE_URL}/user/${id}`, config);
         console.log(response.data)

         const userData = {
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            city: response.data.city,
            country: response.data.country,
            bio: response.data.bio,
         }

         await setUserData(userData)

      } catch (error) {
         console.error(error);
      }
   }

   async function updateUser(data) {
      console.log(data)

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {

         const response = await axios.put(`${USERS_BASE_URL}/user/${id}`, data, config);
         console.log(response.data)

         if (response.status === 200) {
            await loadUser()
            reset(defaultValues)
            navigate(-1)
         }

      } catch (error) {
         console.error(error);
      }

   }

   async function deleteUser() {

      console.log("DELETE")

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {
         const response = await axios.delete(`${USERS_BASE_URL}/user/${id}`, config)
         console.log(response)

         if (response.status === 200) {
            navigate("/")
            logoutUser()
         }


      } catch (error) {
         console.log(error.response)
      }
   }


   //  reset form with the data from the database
   useEffect(() => {
      reset(userData)
      // eslint-disable-next-line
   }, [userData])


   useEffect(() => {
      getUserById()
      // eslint-disable-next-line
   }, [])


   return (
      <Layout navLinks={navLinks}>
         <Container fullHeight={true} bgImage={whiteAltitudeLines} maxWidth={800}>

            <StyledEditProfile>

               <h1>Verander jouw Profiel</h1>
               <SubmitForm onSubmit={handleSubmit(updateUser)} register={register}
                           submitButtonTitle="Update Profiel">

                  <InputField labelTitle="Voornaam" name="firstname" register={register}/>
                  <InputField labelTitle="Achternaam" name="lastname" register={register}/>
                  <InputField labelTitle="Email" name="email" type="email" register={register}/>
                  <InputField labelTitle="Woonplaats" name="city" register={register}/>
                  <InputField labelTitle="Land" name="country" register={register}/>
                  <TextArea labelTitle="Bio" name="bio" height={150} register={register}/>

               </SubmitForm>
               <div className="delete-button">
                  <StyledTextButton type="button"
                                    onClick={deleteUser}>
                     of Verwijder account
                  </StyledTextButton>
               </div>
            </StyledEditProfile>
         </Container>
      </Layout>
   )
}

const StyledEditProfile = styled.div`

  h1 {
    color: ${({theme: {colors}}) => colors.red};
    text-align: center;
  }
  
  label{
    color: ${({theme: {colors}}) => colors.green};
  }

  .delete-button {
    display: flex;
    justify-content: flex-end;

    button {
      color: ${({theme: {colors}}) => colors.green};
      padding: 1rem 0 1rem;
      cursor: pointer;
    }
  }
`