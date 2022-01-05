import React from "react";
import styled from "styled-components";

export default function TextArea({labelTitle, name, required = false, height, register}) {

   return (
      <StyledLabel>{labelTitle}
         <StyledTextArea {...register(`${name}`)} height={height} required={required}/>
      </StyledLabel>
   )
}

const StyledLabel = styled.label`
  color: ${({theme: {colors}}) => colors.white};
  font-size: 1.6rem;
`

const StyledTextArea = styled.textarea`
  padding: 0.8rem 1.6rem;
  font-family: "Merriweather", serif;
  font-size: 1.6rem;
  color: ${({theme: {colors}}) => colors.black};
  border: 3px solid ${({theme: {colors}}) => colors.green};
  width: 100%;
  background-color: ${({theme: {colors}}) => colors.white};
  display: block;
  height: ${({height}) => `${height}px`};

`