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
import SubmitForm from "../components/form-inputs/SubmitForm";
import awsGetProfileImage from "../utils/awsGetProfileImage";
import {AlertContext} from "../context/alert/AlertContext";
import Alert from "../components/layout/Alert";
import InputImageUpload from "../components/form-inputs/InputImageUpload";


export default function EditProfile() {

   const {authUser, loadUser} = useContext(AuthContext)
   const {setAlert} = useContext(AlertContext)

   const [userData, setUserData] = useState({})

   //  react-router-dom
   const {userId} = useParams()
   const navigate = useNavigate()

   // React Form Hook
   const defaultValues = {
      firstname: "",
      lastname: "",
      email: "",
      city: undefined,
      country: undefined,
      bio: undefined,
      previewImage: undefined,
      profileImage: ""
   }
   const {register, handleSubmit, reset} = useForm({defaultValues})


   const navLinks = [
      {title: "Home", url: "/"},
      {title: authUser.firstname, url: `/users/user/${authUser.id}`, image: awsGetProfileImage(authUser.id)}
   ]


   //  reset form with the data from the database
   useEffect(() => {
      reset(userData)
      // eslint-disable-next-line
   }, [userData])


   useEffect(() => {
      getUserById()
      // eslint-disable-next-line
   }, [])


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
            profileImage: response.data.profileImage,
            previewImage: response.data.profileImage
         }

         await setUserData(userData)

      } catch (error) {
         console.error(error);
      }
   }


   async function updateUser(data) {

      console.log(data)

      if (data.profileImage === null && data.previewImage === null) return setAlert(["Profiel foto is verplicht"], 400, true)

      if (data.profileImage !== data.previewImage) {


         try {

            const imageOne = data.previewImage[0]
            const formData = new FormData();
            formData.append("file", imageOne);

            const config = {
               headers: {
                  "Content-Type": "multipart/formData",
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               }
            }

            data = {
               ...data,
               profileImage: data.previewImage[0].name
            }


            await axios.post(`${USERS_BASE_URL}/user/${authUser.id}/profile-image/upload`,
               formData, config)

            console.log("Profile image successfully uploaded.")

         } catch (error) {
            console.log(error.response)
         }
      }


      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const updateUser = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            city: data.city,
            country: data.country,
            bio: data.bio,
         }

         const response = await axios.put(`${USERS_BASE_URL}/user/${userId}`, updateUser, config);

         if (response.status === 200) {
            await loadUser()
            reset(defaultValues)
            navigate(-1)
         }

      } catch (error) {

         const status = error.response.data.status
         const message = error.response.data.message

         switch (status) {
            case 400:
               setAlert(message, status, true)
               return
            default:
               return;
         }
      }
   }


   return (
      <Layout navLinks={navLinks}>
         <Container bgImage={whiteAltitudeLines} maxWidth={800}>

            <StyledEditProfile>

               <h1>Verander jouw Profiel</h1>

               <Alert/>

               <SubmitForm onSubmit={handleSubmit(updateUser)} register={register}
                           submitButtonTitle="Update Profiel">

                  <InputImageUpload labelTitle="Verander profiel foto" name="previewImage" register={register}
                                    image={awsGetProfileImage(authUser.id)}/>
                  <InputField labelTitle="Voornaam" name="firstname" register={register}/>
                  <InputField labelTitle="Achternaam" name="lastname" register={register}/>
                  <InputField labelTitle="Email" name="email" type="email" register={register}/>
                  <InputField labelTitle="Woonplaats" name="city" register={register}/>
                  <InputField labelTitle="Land" name="country" register={register}/>
                  <TextArea labelTitle="Bio" name="bio" height={150} register={register}/>

               </SubmitForm>

            </StyledEditProfile>
         </Container>
      </Layout>
   )
}

const StyledEditProfile = styled.div`

  padding-bottom: 3rem;

  h1 {
    padding-top: 20rem;
    color: ${({theme: {colors}}) => colors.red};
    text-align: center;
  }

  label {
    color: ${({theme: {colors}}) => colors.darkGreen};
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