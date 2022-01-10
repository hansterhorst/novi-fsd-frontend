import React, {useContext} from "react";
import StyledThemesProvider from "./styles/StyledThemeProvider";
import ResetCSS from "./styles/ResetCSS";
import StyledTypography from "./styles/StyledTypography";
import Home from "./pages/Home";
import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Travelstories from "./pages/Travelstories";
import Travelstory from "./pages/Travelstory";
import User from "./pages/User";
import CreateTravelstory from "./pages/CreateTravelstory";
import EditTravelstory from "./pages/EditTravelstory";
import Admin from "./pages/Admin";
import {AuthContext} from "./context/auth/AuthContext";
import PageNotFound from "./pages/PageNotFound";

export default function App() {

   const {authUser} = useContext(AuthContext)

   return (
      <StyledThemesProvider>
         <ResetCSS/>
         <StyledTypography/>
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/public/travelstory/:id" element={<Travelstory/>}/>
            <Route element={<RequireUserAuth authUser={authUser}/>}>
               <Route path="/travelstories" element={<Travelstories/>}/>
               <Route path="/travelstory/new/:userId" element={<CreateTravelstory/>}/>
               <Route path="/travelstory/:id" element={<Travelstory/>}/>
               <Route path="/travelstory/edit/:id" element={<EditTravelstory/>}/>
               <Route path="/user/:userId" element={<User/>}/>
            </Route>
            <Route element={<RequireAdminAuth authUser={authUser}/>}>
               <Route path="/admin" element={<Admin/>}/>
               <Route path="/admin/travelstory/:id" element={<EditTravelstory/>}/>
            </Route>
            <Route path="*" element={<PageNotFound/>}/>
         </Routes>
      </StyledThemesProvider>
   );
}


function RequireAdminAuth({authUser}) {

   if (!(authUser.isAuth && authUser.roles.includes('ADMIN'))) {
      return <Navigate to="/login"/>;
   }

   return <Outlet/>;
}


function RequireUserAuth({authUser}) {

   if (!(authUser.isAuth && (authUser.roles.includes('USER') || authUser.roles.includes('ADMIN')))) {
      return <Navigate to="/login"/>;
   }

   return <Outlet/>;
}