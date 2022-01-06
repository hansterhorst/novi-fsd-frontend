import React from "react";
import styled from "styled-components";
import StyledLabel from "../../styles/StyledLabel";

export default function InputCheckbox({
                                         labelTitle,
                                         name,
                                         required = false,
                                         register,
                                      }) {

   return (
      <StyledLabel>
         <StyledInputCheckbox type="checkbox" {...register(`${name}`)}
                              required={required}/>
         {labelTitle}
      </StyledLabel>
   )

}

const StyledInputCheckbox = styled.input`
  margin-bottom: 1.5rem;
  display: inline-block;
  margin-right: 1rem;
`
