import React from "react";
import styled from "styled-components";
import LoadingIcon from "../loading/LoadingIcon";

export default function MenuButton({toggleSideNavbar}) {

   function handleClick(){
      toggleSideNavbar()
   }

   return (
      <StyledMenuButton type="button" onClick={() => handleClick()}>
         <LoadingIcon/>
      </StyledMenuButton>
   )
}

const StyledMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  border: none;
  padding: 0;
  width: 50px;
  height: 50px;
  background-color: ${({theme: {colors}}) => colors.darkGray};
  border-radius: 10px;
  z-index: 100;

  img {
    width: 100%;
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.md} {
    display: block;
  }

`