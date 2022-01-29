import React from "react";
import styled from "styled-components";
import StyledLabel from "../../styles/StyledLabel";

export default function InputOption({
                                       labelTitle,
                                       name,
                                       required = false,
                                       register,
                                       options,
                                       placeholder
                                    }) {

   return (
      <StyledLabel>{labelTitle}
         <StyledSelect {...register(`${name}`)} required={required}>
            <option value="Trip">{placeholder}</option>
            {options.map((option, index) => (
               <option key={index} value={option}>{option}</option>
            ))}
         </StyledSelect>
      </StyledLabel>
   )
}

const StyledSelect = styled.select`
  padding: 0.8rem 1.6rem;
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  color: ${({theme: {colors}}) => colors.black};
  border: 3px solid ${({theme: {colors}}) => colors.darkGreen};
  width: 100%;
  background-color: ${({theme: {colors}}) => colors.white};
  margin-bottom: 1.5rem;
`
