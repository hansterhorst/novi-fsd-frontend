import React from "react";
import StyledThemesProvider from "./styles/StyledThemeProvider";
import ResetCSS from "./styles/ResetCSS";
import StyledTypography from "./styles/StyledTypography";
import Home from "./pages/Home";

function App() {
   return (
      <StyledThemesProvider>
         <ResetCSS/>
         <StyledTypography/>
         <Home/>
      </StyledThemesProvider>
   );
}

export default App;
