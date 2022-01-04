import React from "react";
import StyledThemesProvider from "./styles/StyledThemeProvider";
import ResetCSS from "./styles/ResetCSS";
import StyledTypography from "./styles/StyledTypography";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";

function App() {
   return (
      <StyledThemesProvider>
         <ResetCSS/>
         <StyledTypography/>
            <Routes>
               <Route path="/" element={<Home/>}/>
            </Routes>
      </StyledThemesProvider>
   );
}

export default App;
