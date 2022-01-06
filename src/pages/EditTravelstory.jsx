import React, {useEffect, useState} from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Container from "../components/Container";
import greenAltitudeLines from "../assets/images/green-altitude-lines.png"
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import StyledButton from "../styles/StyledButton";
import {pageNavLinks} from "./pageNavLinks";
import InputField from "../components/form-inputs/InputField";
import {useForm} from "react-hook-form";
import TextArea from "../components/form-inputs/TextArea";
import InputCheckbox from "../components/form-inputs/InputCheckbox";
import InputOption from "../components/form-inputs/InputOption";
import StyledLabel from "../styles/StyledLabel";
import {useParams} from "react-router-dom";
import axios from "axios";
import StyledTextButton from "../styles/StyledTextButton";


export default function EditTravelstory() {

   let {id} = useParams()
   const [fetchDate, setFetchData] = useState({})

   const {register, handleSubmit, reset} = useForm()

   const editTravelstory = async () => {

      try {
         const response = await axios.get(`http://localhost:8080/api/v1/travelstories/${id}`);

         const data = {
            ...response.data,
            tripDate: covertDateToInputDate(response.data.tripDate),
         }

         setFetchData(data)

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
      reset(fetchDate)
      // eslint-disable-next-line
   }, [fetchDate])


   function onSubmit(data) {
      console.log(data)
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
               <h1>Verander jouw TravelStory voor een nog betere reiservaring</h1>
            </Container>
            <Container maxWidth={900} bgImage={greenAltitudeLines}>
               <StyledForm onSubmit={handleSubmit(onSubmit)}>
                  <p>Gebruik het formulier hieronder om jouw reisverhaal te verbeteren. Ga na de
                     inputveld om daar jouw wijzigingen door te voeren.</p>

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

                  <InputField labelTitle="* Image link" name="imageUrl" register={register}/>

                  <InputCheckbox labelTitle="Mag iedereen uw reisverhaal lezen?" name="isPrivate"
                                 checked={true} register={register}/>

                  <TextArea labelTitle="* Reisverhaal" name="article" register={register}
                            height={400}/>

                  <div className="form-footer">
                     <StyledLabel>* Verplichte velden</StyledLabel>
                     <div className="form-buttons">
                        <StyledButton type="onsubmit">Update TravelStory</StyledButton>
                        <StyledTextButton type="button" onClick={() => console.log("Verwijder")}>of
                           Verwijder</StyledTextButton>
                     </div>
                  </div>
               </StyledForm>
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

`

const StyledForm = styled.form`

  padding: 5rem 0;

  p {
    margin-bottom: 3rem;
  }

  label {
    color: ${({theme: {colors}}) => colors.white};
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }


  .form-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;

    .form-buttons {
      display: flex;
      flex-direction: column;
      align-items: end;
      row-gap: 1rem;
    }
  }

`

