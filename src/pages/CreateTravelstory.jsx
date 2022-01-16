import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Container from "../components/Container";
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {pageNavLinks} from "./pageNavLinks";
import {useForm} from "react-hook-form";
import CreateEditForm from "../components/form-inputs/CreateEditForm";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {USERS_BASE_URL} from "../utils/constants";


export default function CreateTravelstory() {

   const navigate = useNavigate()
   const {userId} = useParams()

   const {register, handleSubmit} = useForm({
      defaultValues: {
         isPublic: true
      }
   })

   async function createTravelstory(data) {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {

         const response = await axios.post(`${USERS_BASE_URL}/travelstories/user/${userId}`, data, config)

         const storyId = response.data.id
         if (response.status === 201) return navigate(`/users/travelstory/${storyId}`)

      } catch (error) {
         console.log(error.response)
      }

   }

   return (
      <Layout navLinks={pageNavLinks.user}>
         <StyledCreateTravelstory>

            <Container maxWidth={900} bgImage={whiteAltitudeLines}>
               <h1>Schrijf TravelStories over jouw trips en deel deze met jouw vrienden </h1>
            </Container>

            <Container maxWidth={900} bgImage={greenAltitudeLines}>

               <p>Gebruik het formulier hieronder om jouw reisverhaal te maken. Om een
                  reisverhaal
                  te maken, geef het een titel, de datum van wanneer de trip is gemaakt, in welk
                  land was de trip en wat voor trip was het, (road-, fiets-, steden- of dagtrip).
                  Vervolgens schrijf je je reisverhaal en upload je maximaal 6 van je mooiste
                  foto’s
                  over deze trip.</p>

               <CreateEditForm onSubmit={handleSubmit(createTravelstory)} register={register}
                               submitButtonTitle="Verstuur Travelstory"/>

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

  p {
    padding-top: 5rem;
  }

  .padding {
    padding-bottom: 5rem;
  }

`
