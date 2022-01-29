import React from "react";
import StyledLabel from "../../styles/StyledLabel";
import StyledInput from "../../styles/StyledInput";

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
