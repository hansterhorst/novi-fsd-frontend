import React from "react";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import styled from "styled-components";

export default function Layout({children, navLinks}) {
   return (
      <StyledLayout>
         <TopNavbar navLinks={navLinks}/>
         <main>
            {children}
         </main>
         <Footer/>
      </StyledLayout>
   );
}

const StyledLayout = styled.div`

  width: 100vw;

  main {
    height: 100%;
  }

`