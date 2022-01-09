import React from "react";
import InputField from "./InputField";
import InputOption from "./InputOption";
import InputCheckbox from "./InputCheckbox";
import TextArea from "./TextArea";
import StyledLabel from "../../styles/StyledLabel";
import StyledButton from "../../styles/StyledButton";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export default function CreateEditForm({onSubmit, register, submitButtonTitle}) {

   const navigate = useNavigate()

   return (
      <StyledForm onSubmit={onSubmit}>

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

         <InputCheckbox labelTitle="Mag iedereen uw reisverhaal lezen?" name="isPublic"
                        checked={true} register={register}/>

         <TextArea labelTitle="* Reisverhaal" name="article" register={register}
                   height={400}/>

         <div className="form-footer">
            <StyledLabel>* Verplichte velden</StyledLabel>
            <div className="form-buttons">
               <StyledButton onClick={() => navigate(-1)}>Cancel</StyledButton>
               <StyledButton type="onsubmit">{submitButtonTitle}</StyledButton>
            </div>
         </div>

      </StyledForm>
   )
}


const StyledForm = styled.form`

  padding: 3rem 0 1rem;

  p {
    margin-bottom: 3rem;
  }

  label {
    color: ${({theme: {colors}}) => colors.white};
  }

  .input-container {
    display: flex;
  }


  .form-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;

    .form-buttons {
      display: flex;
      column-gap: 2rem;
    }

    label {
      width: auto;
    }
  }

`

