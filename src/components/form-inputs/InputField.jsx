import React from "react";
import styled from "styled-components";
import StyledLabel from "../../styles/StyledLabel";

export default function InputField({
                                      labelTitle,
                                      type = "text",
                                      name,
                                      required = false,
                                      register
                                   }) {

   return (
      <StyledLabel>{labelTitle}
         <StyledInput type={type} {...register(`${name}`)} required={required}/>
      </StyledLabel>
   )

}

const StyledInput = styled.input`
  padding: 0.8rem 1.6rem;
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  color: ${({theme: {colors}}) => colors.black};
  border: 3px solid ${({theme: {colors}}) => colors.green};
  width: 100%;
  background-color: ${({theme: {colors}}) => colors.white};
  margin-bottom: 1.5rem;
`
