import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png"
import StyledNavLink from "../../styles/StyledNavLink";
import ProfileImage from "../ProfileImage";

export default function SideNavbar({navLinks, show, toggleSideNavbar}) {

   return (
      <StyledSideNavbar show={show}>
         <div className="nav-logo">
            <img src={logo} alt="Logo"/>
         </div>
         <div className="nav-links">
            {navLinks && navLinks.map(({title, url, cta, image}) => (
               <div className="nav-link" key={title} onClick={toggleSideNavbar}>
                  <StyledNavLinkText to={url}
                                     onClick={cta}>{image &&
                     <span><ProfileImage profileImage={image} squareSize={16}/></span>}
                     {title}
                  </StyledNavLinkText>
               </div>
            ))}
         </div>
      </StyledSideNavbar>
   )
}

const StyledSideNavbar = styled.nav`
  background-color: ${({theme: {colors}}) => colors.darkGray};
  position: fixed;
  width: 60vw;
  left: ${({show}) => show ? `0` : `-60vw`};
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all ease-in-out 0.3s;

  .nav-logo {
    margin-top: 2rem;
    flex: 1;
  }

  .nav-links {
    flex: 2;
    width: 100%;
  }
`

const StyledNavLinkText = styled(StyledNavLink)`
  background-color: ${({theme: {colors}}) => colors.darkGray};
  margin: 1rem 0;
  justify-content: center;
  font-size: 2rem;
`