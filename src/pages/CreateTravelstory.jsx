import React from "react";
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


export default function CreateTravelstory() {

   const {register, handleSubmit} = useForm({
      defaultValues: {
         isPrivate: true
      }
   })


   function onSubmit(data) {
      console.log(data)
   }


   return (
      <Layout navLinks={pageNavLinks.user}>
         <StyledCreateTravelstory>
            <Container maxWidth={900} bgImage={whiteAltitudeLines}>
               <h1>Schrijf TravelStories over jouw trips en deel deze met jouw vrienden </h1>
            </Container>
            <Container maxWidth={900} bgImage={greenAltitudeLines}>
               <StyledForm onSubmit={handleSubmit(onSubmit)}>
                  <p>Gebruik het formulier hieronder om jouw reisverhaal te maken. Om een
                     reisverhaal
                     te maken, geef het een titel, de datum van wanneer de trip is gemaakt, in welk
                     land was de trip en wat voor trip was het, (road-, fiets-, steden- of dagtrip).
                     Vervolgens schrijf je je reisverhaal en upload je maximaal 6 van je mooiste
                     foto’s
                     over deze trip.</p>

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
                     <StyledButton type="onsubmit">Verstuur TravelStory</StyledButton>
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
  }

`

