import React, {useEffect, useState} from "react";
import Container from "../Container";
import styled from "styled-components";
import StyledNavLink from "../../styles/StyledNavLink";
import TravelStoriesLogo from "../../assets/svg/TravelStoriesLogo";
import ProfileImage from "../ProfileImage";

export default function TopNavbar({navLinks}) {

   const MAX_SCROLL_HEIGHT = 100;
   const [hasScrolled, setHasScrolled] = useState(false);

   const handleScroll = (e) => {
      const scrollTop = e.target.scrollingElement.scrollTop;
      if (scrollTop > MAX_SCROLL_HEIGHT) {
         setHasScrolled(true);
      } else {
         setHasScrolled(false);
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);


   return (
      <StyledNavbar hasScrolled={hasScrolled}>
         <Container>
            <Navbar>
               <TravelStoriesLogo/>
               <NavUl>
                  {navLinks && navLinks.map(({title, url, cta, image}) => (
                     <NavLi key={title}>
                        <StyledNavLink to={url}
                                       onClick={cta}>{image &&
                           <span><ProfileImage profileImage={image} squareSize={16}/></span>}
                           {title}
                        </StyledNavLink>
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
  top: 20px;
  width: 100%;
  transition: 0.3s ease-in-out;
  background-color: transparent;
  z-index: 100;

  ${({hasScrolled}) => hasScrolled === true && `
      background-color: #232F2F;
      top: 0;
      `
  };

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



