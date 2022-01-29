import React, {useState} from "react";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import MenuButton from "./MenuButton";
import SideNavbar from "./SideNavbar";

export default function Layout({children, navLinks}) {

   const [show, toggleShow] = useState(false)

   function toggleSideNavbar() {
      toggleShow(!show)
   }

   return (
      <>
         <MenuButton toggleSideNavbar={toggleSideNavbar}/>
         <TopNavbar navLinks={navLinks}/>
         <SideNavbar navLinks={navLinks} show={show}/>
         <main>
            {children}
         </main>
         <Footer/>
      </>
   );
}
