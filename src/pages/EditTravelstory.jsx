import React, {useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Container from "../components/Container";
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {pageNavLinks} from "./pageNavLinks";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import StyledTextButton from "../styles/StyledTextButton";
import CreateEditForm from "../components/form-inputs/CreateEditForm";


export default function EditTravelstory() {

   const {id} = useParams()
   const navigate = useNavigate()

   const [apiData, setApiData] = useState({})

   const {register, handleSubmit, reset} = useForm()

   const editTravelstory = async () => {

      try {
         const response = await axios.get(`http://localhost:8080/api/v1/travelstories/${id}`);

         const data = {
            ...response.data,
            tripDate: covertDateToInputDate(response.data.tripDate),
         }

         setApiData(data)

      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      editTravelstory()
      // eslint-disable-next-line
   }, [])


   //   reset form with the data from the database
   useEffect(() => {
      reset(apiData)
      // eslint-disable-next-line
   }, [apiData])


   async function onSubmit(data) {

      try {
         const response = await axios.put(`http://localhost:8080/api/v1/travelstories/${id}`, data)
         console.log(response)

         if (response.status === 200) {
            navigate(`/travelstory/${id}`)
         }

      } catch (error) {
         console.log(error)
      }

      console.log(data)
   }

   async function deleteTravelstory() {

      const userId = apiData.userId

      try {
         const response = await axios.delete(`http://localhost:8080/api/v1/travelstories/${id}`)
         console.log(response)

         if (response.status === 200) {
            navigate(`/user/${userId}`)
         }

      } catch (error) {
         console.log(error)
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
      <Layout navLinks={pageNavLinks.user}>
         <StyledCreateTravelstory>
            <Container maxWidth={900} bgImage={whiteAltitudeLines}>
               <h1>Verander jouw TravelStory voor een nog mooiere reisverhaal</h1>
            </Container>
            <Container maxWidth={900} bgImage={greenAltitudeLines}>
               <p>Gebruik het formulier hieronder om jouw reisverhaal te verbeteren. Ga na de
                  inputveld om daar jouw wijzigingen door te voeren. Vervolgens klik je op
                  button "UPDATE TRAVELSTORY"</p>

               <CreateEditForm onSubmit={handleSubmit(onSubmit)} register={register}
                               submitButtonTitle="Update Travelstory"/>

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
