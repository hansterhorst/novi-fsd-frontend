import React, {useContext} from "react";
import StyledThemesProvider from "./styles/StyledThemeProvider";
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
import {ROLE_ADMIN, ROLE_USER} from "./utils/constants";
import EditProfile from "./pages/EditProfile";

export default function App() {

   const {isAuth, roles} = useContext(AuthContext)

   return (
      <StyledThemesProvider>
         <StyledTypography/>
         <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/public/travelstories/:travelstoryId" element={<Travelstory/>}/>
            {/* USERS AUTHENTICATION ROUTES */}
            <Route element={<RequireUserAuthentication isAuth={isAuth} roles={roles}/>}>
               <Route path="/users/travelstories" element={<Travelstories/>}/>
               <Route path="/users/travelstories/new/" element={<CreateTravelstory/>}/>
               <Route path="/users/travelstories/:travelstoryId" element={<Travelstory/>}/>
               <Route path="/users/travelstories/edit/:travelstoryId" element={<EditTravelstory/>}/>
               <Route path="/users/user/:userId" element={<User/>}/>
               <Route path="/users/user/:userId/edit" element={<EditProfile/>}/>
            </Route>
            {/* ADMIN AUTHENTICATION ROUTES */}
            <Route element={<RequireAdminAuthentication isAuth={isAuth} roles={roles}/>}>
               <Route path="/admin" element={<Admin/>}/>
               <Route path="/admin/travelstory/:travelstoryId" element={<Travelstory/>}/>
            </Route>
            {/* PAGE NOT FOUND ROUTE*/}
            <Route path="*" element={<PageNotFound/>}/>
         </Routes>
      </StyledThemesProvider>
   );
}


function RequireAdminAuthentication({isAuth, roles}) {
   if (!isAuth && !roles.includes(ROLE_ADMIN)) {
      return <Navigate to="/login"/>;
   }

   if (!roles.includes(ROLE_ADMIN)) {
      return <Navigate to="/users/travelstories"/>;
   }

   // renders the next match
   return <Outlet/>;
}


function RequireUserAuthentication({isAuth, roles}) {

   if (!(isAuth && (roles.includes(ROLE_USER) || roles.includes(ROLE_ADMIN)))) {
      return <Navigate to="/login"/>;
   }

   return <Outlet/>;
}