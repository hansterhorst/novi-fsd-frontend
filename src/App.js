import React from "react";
import StyledThemesProvider from "./styles/StyledThemeProvider";
import ResetCSS from "./styles/ResetCSS";
import StyledTypography from "./styles/StyledTypography";

function App() {
   return (
      <StyledThemesProvider>
         <ResetCSS/>
         <StyledTypography/>
         <h1>App</h1>
      </StyledThemesProvider>
   );
}

export default App;
