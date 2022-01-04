import React from "react";
import StyledThemesProvider from "./styles/StyledThemeProvider";
import ResetCSS from "./styles/ResetCSS";
import StyledTypography from "./styles/StyledTypography";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
   return (
      <StyledThemesProvider>
         <ResetCSS/>
         <StyledTypography/>
            <Routes>
               <Route path="/" element={<Home/>}/>
               <Route path="/register" element={<Register/>}/>
               <Route path="/login" element={<Login/>}/>
            </Routes>
      </StyledThemesProvider>
   );
}

export default App;
