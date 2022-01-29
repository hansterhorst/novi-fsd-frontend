import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png"

export default function Footer() {
   return (
      <StyledFooter>
         <img src={logo} alt="Logo"/>
         <a href="https://www.hansterhorst.com"><h4>Created by Hans ter Horst</h4></a>
      </StyledFooter>
   );
}

const StyledFooter = styled.footer`
  background-color: ${({theme: {colors}}) => colors.darkGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0 20px;
  height: 150px;
  z-index: 1000;

  h4 {
    color: ${({theme: {colors}}) => colors.red};
  }
`;
