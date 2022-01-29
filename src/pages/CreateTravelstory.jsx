import React, {useContext} from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Container from "../components/Container";
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {USERS_BASE_URL} from "../utils/constants";
import {AuthContext} from "../context/auth/AuthContext";
import SubmitForm from "../components/form-inputs/SubmitForm";
import InputField from "../components/form-inputs/InputField";
import InputOption from "../components/form-inputs/InputOption";
import InputCheckbox from "../components/form-inputs/InputCheckbox";
import TextArea from "../components/form-inputs/TextArea";
import InputImageUpload from "../components/form-inputs/InputImageUpload";
import {AlertContext} from "../context/alert/AlertContext";
import Alert from "../components/layout/Alert";
import awsGetProfileImage from "../utils/awsGetProfileImage";


export default function CreateTravelstory() {

   const {isAuth, authUser} = useContext(AuthContext)
   const {setAlert} = useContext(AlertContext)

   const navigate = useNavigate()

   const defaultValues = {
      isPublic: true,
      article: "",
      country: "",
      imageOne: {},
      imageUrl: "",
      title: "",
      tripDate: "",
      tripType: undefined,
   }
   const {register, handleSubmit} = useForm({defaultValues})

   const navLinks = isAuth && [
      {
         title: "Travelstories",
         url: "/users/travelstories"
      },
      {
         title: authUser.firstname,
         url: `/users/user/${authUser.id}`,
         image: awsGetProfileImage(authUser.id)
      },
   ]


   async function createTravelstory(data) {
      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.post(`${USERS_BASE_URL}/travelstories/user/${authUser.id}`, data, config)

         const storyId = response.data.id

         // status code from the database, if image is set
         if (response.status === 201 && data.imageOne[0]) {

            const imageOne = data.imageOne[0]
            const formData = new FormData();
            formData.append("file", imageOne);

            const config = {
               headers: {
                  "Content-Type": "multipart/formData",
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
               }
            }

            const response = await axios.post(`${USERS_BASE_URL}/user/${authUser.id}/travelstory/${storyId}/images/upload`,
               formData, config)

            if (response.status === 200) {
               navigate(`/users/travelstories/${storyId}`)
               console.log("Image successfully uploaded.")
            }

         } else {
            setAlert(["Eén foto is verplicht"], 400, true)
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
         <StyledCreateTravelstory>

            <Container maxWidth={900} bgImage={whiteAltitudeLines}>
               <h1>Schrijf TravelStories over jouw trips en deel deze met jouw vrienden </h1>
            </Container>

            <Container maxWidth={900} bgImage={greenAltitudeLines}>

               <div className="description">
                  <p>Gebruik het formulier hieronder om jouw reisverhaal te maken. Om een
                     reisverhaal
                     te maken, geef het een titel, de datum van wanneer de trip is gemaakt, in welk
                     land was de trip en wat voor trip was het, (road-, fiets-, steden- of dagtrip).
                     Vervolgens schrijf je je reisverhaal en upload je maximaal 6 van je mooiste
                     foto’s
                     over deze trip.</p>
               </div>

               <Alert/>

               <SubmitForm onSubmit={handleSubmit(createTravelstory)} register={register}
                           submitButtonTitle="Verstuur Travelstory">

                  <InputField labelTitle="* Titel Reisverhaal" name="title" register={register}/>

                  <InputField labelTitle="* Welk land" name="country" register={register}/>

                  <div className="input-container">
                     <InputField labelTitle="* Datum Reis" type="date" name="tripDate"
                                 register={register}/>

                     <InputOption labelTitle="* Wat voor trip was het??" name="tripType"
                                  checked={true} register={register}
                                  placeholder="-- Kies een reis type --"
                                  options={["Bikepacking", "Roadtrip", "Stedentrip", "Vakantie", "Weekend"]}/>
                  </div>

                  <InputCheckbox labelTitle="Mag iedereen uw reisverhaal lezen?" name="isPublic"
                                 checked={true} register={register}/>

                  <TextArea labelTitle="* Reisverhaal" name="article" register={register}
                            height={400}/>

                  {/* IMAGE UPLOAD */}
                  <div className="preview-images">
                     <InputImageUpload labelTitle="* Foto 1" name="imageOne" register={register}/>
                  </div>

               </SubmitForm>

               <div className="padding"/>
            </Container>
         </StyledCreateTravelstory>
      </Layout>
   )
}

const StyledCreateTravelstory = styled.div`

  h1 {
    padding: 25rem 0 5rem;
    text-transform: uppercase;
    color: ${({theme: {colors}}) => colors.red};
    text-align: center;
  }

  .description {
    padding-top: 5rem;
  }

  .padding {
    padding-bottom: 5rem;
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.md} {
    h1 {
      padding: 5rem 0 5rem;
    }
  }
   
`
