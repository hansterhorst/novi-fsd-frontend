import React from "react";
import StyledThemesProvider from "./styles/StyledThemeProvider";
import ResetCSS from "./styles/ResetCSS";
import StyledTypography from "./styles/StyledTypography";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Travelstories from "./pages/Travelstories";
import Travelstory from "./pages/Travelstory";
import User from "./pages/User";
import CreateTravelstory from "./pages/CreateTravelstory";

function App() {
   return (
      <StyledThemesProvider>
         <ResetCSS/>
         <StyledTypography/>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/travelstories" element={<Travelstories/>}/>
            <Route path="/travelstory/new" element={<CreateTravelstory/>}/>
            <Route path="/travelstory/:id" element={<Travelstory/>}/>
            <Route path="/user/:userId" element={<User/>}/>
         </Routes>
      </StyledThemesProvider>
   );
}

export default App;
