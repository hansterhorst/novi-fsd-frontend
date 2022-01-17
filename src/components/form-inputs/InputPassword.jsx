import React, {useState} from "react";
import styled from "styled-components";
import StyledLabel from "../../styles/StyledLabel";

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
    color: ${({theme: {colors}}) => colors.green};
    font-weight: normal;
    font-size: 1.4rem;
    margin: 0 auto;
    background-color: transparent;
    cursor: pointer;
  }
`

const StyledInput = styled.input`
  padding: 0.8rem 1.6rem;
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  color: ${({theme: {colors}}) => colors.black};
  border: 3px solid ${({theme: {colors}}) => colors.green};
  width: 100%;
  background-color: ${({theme: {colors}}) => colors.white};
  margin-bottom: 1.5rem;
  height: auto;
`
