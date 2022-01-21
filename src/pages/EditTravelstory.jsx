import React, {useContext, useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Container from "../components/Container";
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import StyledTextButton from "../styles/StyledTextButton";
import {USERS_BASE_URL} from "../utils/constants";
import {AuthContext} from "../context/auth/AuthContext";
import SubmitForm from "../components/form-inputs/SubmitForm";
import InputField from "../components/form-inputs/InputField";
import InputOption from "../components/form-inputs/InputOption";
import InputCheckbox from "../components/form-inputs/InputCheckbox";
import TextArea from "../components/form-inputs/TextArea";
import InputImageUpload from "../components/form-inputs/InputImageUpload";


export default function EditTravelstory() {

   const {isAuth} = useContext(AuthContext)

   //  react-router-dom
   const {travelstoryId} = useParams()
   const navigate = useNavigate()

   const defaultValues = {
      isPublic: true,
      article: "",
      country: "",
      imageOne: undefined,
      imageUrl: "",
      title: "",
      tripDate: "",
      tripType: "",
   }
   const [apiData, setApiData] = useState(defaultValues)

   const {register, handleSubmit, reset} = useForm({defaultValues})

   const navLinks = isAuth && [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Travelstories",
         url: "/users/travelstories"
      },

   ]

   const getTravelstory = async () => {

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.get(`${USERS_BASE_URL}/travelstories/${travelstoryId}`, config);

         const data = {
            ...response.data,
            tripDate: covertDateToInputDate(response.data.tripDate),
            imageOne: response.data.imageUrl
         }

         setApiData(data)

      } catch (error) {
         console.error(error);
      }
   }


   useEffect(() => {
      getTravelstory()
      // eslint-disable-next-line
   }, [])


   //   reset form with the data from the database
   useEffect(() => {
      reset(apiData)
      // eslint-disable-next-line
   }, [apiData])


   async function updateTravelstory(data) {

      if (data.imageOne !== data.imageUrl) {

         try {

            const imageOne = data.imageOne[0]
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
               imageUrl: data.imageOne[0].name
            }

            const response = await axios.post(`${USERS_BASE_URL}/user/${apiData.userId}/travelstory/${travelstoryId}/images/upload`,
               formData, config)

            console.log(response)

            console.log("Image successfully uploaded.")


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

         const response = await axios.put(`${USERS_BASE_URL}/travelstories/${travelstoryId}`, data, config)

         if (response.status === 200) {
            navigate(-1)
         }

      } catch (error) {
         console.log(error.response)
      }

   }


   async function deleteTravelstory() {

      const userId = apiData.userId

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {
         const response = await axios.delete(`${USERS_BASE_URL}/travelstories/${travelstoryId}`, config)

         if (response.status === 200) {
            navigate(`/users/user/${userId}`)
         }

      } catch (error) {
         console.log(error.response)
      }
   }


   function covertDateToInputDate(date) {
      if (date !== "") {
         return new Date(date).toISOString().split('T')[0]
      } else {
         return null
      }
   }


   return (
      <Layout navLinks={navLinks}>
         <StyledCreateTravelstory>
            <Container maxWidth={900} bgImage={whiteAltitudeLines}>
               <h1>Verander jouw TravelStory voor een nog mooiere reisverhaal</h1>
            </Container>
            <Container maxWidth={900} bgImage={greenAltitudeLines}>
               <p>Gebruik het formulier hieronder om jouw reisverhaal te verbeteren. Ga na de
                  inputveld om daar jouw wijzigingen door te voeren. Vervolgens klik je op
                  button "UPDATE TRAVELSTORY"</p>

               <SubmitForm onSubmit={handleSubmit(updateTravelstory)} submitButtonTitle="Update Travelstory">

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
                     <InputImageUpload labelTitle="* Foto 1" name="imageOne" register={register}
                                       travelstoryId={travelstoryId} userId={apiData.userId}/>
                  </div>

               </SubmitForm>

               <div className="delete-button">
                  <StyledTextButton type="button" onClick={deleteTravelstory}>
                     of Verwijder</StyledTextButton>
               </div>
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

  p {
    padding-top: 5rem;
  }

  .delete-button {
    text-align: end;
    padding-bottom: 5rem;

    button {
      padding: 1rem 0 1rem;
      cursor: pointer;
    }
  }

`
