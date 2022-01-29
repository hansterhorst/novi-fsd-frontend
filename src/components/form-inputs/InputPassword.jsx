import React, {useState} from "react";
import styled from "styled-components";
import StyledLabel from "../../styles/StyledLabel";
import StyledInput from "../../styles/StyledInput";

export default function InputPassword({
                                         labelTitle,
                                         name,
                                         required = false,
                                         register
                                      }) {

   const [show, setShow] = useState(false)

   return (
      <StyledPasswordLabel>{labelTitle}
         <button type="button" onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
         <StyledInput type={show ? "text" : "password"} {...register(`${name}`)}
                      required={required}/>
      </StyledPasswordLabel>
   )
}

const StyledPasswordLabel = styled(StyledLabel)`
  button {
    border: none;
    color: ${({theme: {colors}}) => colors.darkGreen};
    font-weight: normal;
    font-size: 1.4rem;
    margin: 0 auto;
    background-color: transparent;
    cursor: pointer;
  }
`

