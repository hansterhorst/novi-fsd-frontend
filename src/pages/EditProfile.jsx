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
import ProfileImage from "../components/ProfileImage";
import awsGetProfileImage from "../utils/awsGetProfileImage";


export default function EditProfile() {

   const {authUser, loadUser, logoutUser} = useContext(AuthContext)
   const [userData, setUserData] = useState({})

   //  react-router-dom
   const {userId} = useParams()
   const navigate = useNavigate()

   // React Form Hook
   const defaultValues = {firstname: "", lastname: "", email: "", city: "", country: "", bio: "",}
   const {register, handleSubmit, reset} = useForm({defaultValues})


   const navLinks = [
      {title: "Home", url: "/"},
      {title: authUser.firstname, url: `/users/user/${authUser.id}`, image: awsGetProfileImage(authUser.id)}
   ]

   async function getUserById() {

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.get(`${USERS_BASE_URL}/user/${userId}`, config);

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

      try {

         const profileImage = data.profileImage[0]
         const formData = new FormData();
         formData.append("file", profileImage);

         const config = {
            headers: {
               "Content-Type": "multipart/formData",
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.post(`${USERS_BASE_URL}/user/${authUser.id}/profile-image/upload`,
            formData, config)

         if (response.status === 200) {

            try {

               const updateUser = {
                  firstname: data.firstname,
                  lastname: data.lastname,
                  email: data.email,
                  city: data.city,
                  country: data.country,
                  bio: data.bio,
               }

               const config = {
                  headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${localStorage.getItem('token')}`,
                  }
               }

               const response = await axios.put(`${USERS_BASE_URL}/user/${userId}`, updateUser, config);

               if (response.status === 200) {
                  await loadUser()
                  reset(defaultValues)
                  navigate(-1)
                  console.log("Profile image successfully uploaded.")
               }

            } catch (error) {
               console.error(error);
            }
         }


      } catch (error) {
         console.log("ERROR!!! " + error.response)
      }


   }

   async function deleteUser() {

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.delete(`${USERS_BASE_URL}/user/${userId}`, config)

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

                  {/* PROFILE IMAGE UPLOAD */}
                  <ProfileImage squareSize={200} profileImage={awsGetProfileImage(authUser.id)}/>
                  <InputField labelTitle='Upload profiel foto' name="profileImage" type="file"
                              register={register}/>
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
    margin-top: 20rem;
    color: ${({theme: {colors}}) => colors.red};
    text-align: center;
  }

  label {
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