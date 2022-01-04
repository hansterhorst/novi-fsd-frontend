import React from "react";
import styled from "styled-components";
import StyledButton from "../../styles/StyledButton";
import StyledLink from "../../styles/StyledLink";


export default function LoginRegisterForm({
                                             children,
                                             title,
                                             onSubmit,
                                             submitButtonTitle,
                                             orButtonTitle
                                          }) {

   return (
      <StyledForm onSubmit={onSubmit}>
         <h1>{title}</h1>

         {children}

         <div className="form-footer">
            <label>* Verplichte velden</label>
            <StyledButton type="onsubmit">{submitButtonTitle}</StyledButton>
         </div>

         <div className="or-register">
            <StyledLink to={`/${orButtonTitle.toLowerCase()}`}>or {orButtonTitle}</StyledLink>
         </div>
      </StyledForm>
   )
}


const StyledForm = styled.form`

  padding: 3rem 0;

  h1 {
    color: ${({theme: {colors}}) => colors.red};
    margin: 2rem 0;
  }

  .form-footer {
    display: flex;
    justify-content: space-between;

    label {
      color: ${({theme: {colors}}) => colors.green};
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

  .or-register {
    margin: 3rem 0;
    text-align: center;
  }

`