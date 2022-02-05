import React from "react";
import StyledLabel from "../../styles/StyledLabel";
import StyledButton from "../../styles/StyledButton";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export default function SubmitForm({onSubmit, children, submitButtonTitle}) {

   const navigate = useNavigate()

   return (
      <StyledForm onSubmit={onSubmit}>

         {children}

         <div className="form-footer">
            <StyledLabel>* Verplichte velden</StyledLabel>
            <div className="form-buttons">
               <StyledButton type="button" onClick={() => navigate(-1)}>Cancel</StyledButton>
               <StyledButton type="onsubmit">{submitButtonTitle}</StyledButton>
            </div>
         </div>

      </StyledForm>
   )
}


const StyledForm = styled.form`

  padding: 3rem 0 1rem;

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
      
      button{
        margin-left: 2rem;
      }
    }

    label {
      width: auto;
    }
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.sm} {

    .input-container {
      display: block;
    }
    
    .form-footer {
      flex-direction: column;

      .form-buttons {
        justify-content: end;
        margin-top: 2rem;
      }
    }
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.xs} {

    .form-footer {
      .form-buttons {
        flex-direction: column;
        justify-content: center;
        
        button{
          margin: 1rem 0;
        }
      }
    }
  }

`

