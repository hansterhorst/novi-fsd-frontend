import React from "react";
import styled from "styled-components";
import TravelStoriesLogo from "../../assets/svg/TravelStoriesLogo";

export default function Footer() {
   return (
      <StyledFooter>
         <TravelStoriesLogo />
         <p>Created by Hans ter Horst</p>
      </StyledFooter>
   );
}

const StyledFooter = styled.footer`
  background-color: ${({ theme: { colors } }) => colors.darkGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 20px;

  p {
    font-size: 18px;
    font-weight: 700;
    font-style: italic;
    font-family: "Merriweather", serif;
    color: ${({ theme: { colors } }) => colors.red};
  }
`;
