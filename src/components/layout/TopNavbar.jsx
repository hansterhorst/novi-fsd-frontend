import React from "react";
import Container from "../Container";
import styled from "styled-components";
import StyledNavLink from "../../styles/StyledNavLink";
import TravelStoriesLogo from "../../assets/svg/TravelStoriesLogo";

export default function TopNavbar({navLinks}) {
   return (
      <StyledNavbar>
         <Container>
            <Navbar>
               <TravelStoriesLogo/>
               <NavUl>
                  {navLinks && navLinks.map(({title, url, cta}) => (
                     <NavLi key={title}>
                        <StyledNavLink to={url}
                                       onClick={cta}>{title}</StyledNavLink>
                     </NavLi>
                  ))}
               </NavUl>
            </Navbar>
         </Container>
      </StyledNavbar>
   )
}

const StyledNavbar = styled.nav`
  position: fixed;
  margin-top: 50px;
  width: 100%;
  height: 96px;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavUl = styled.ul`
  display: flex;
  align-items: center;

`;

const NavLi = styled.li`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;



