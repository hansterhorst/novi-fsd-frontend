import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import AuthContextProvider from "./context/auth/AuthContext";
import ResetCSS from "./styles/ResetCSS";
import {AlertContextProvider} from "./context/alert/AlertContext";

ReactDOM.render(
   <React.StrictMode>
      <ResetCSS/>
      <AuthContextProvider>
         <AlertContextProvider>
            <BrowserRouter>
               <App/>
            </BrowserRouter>
         </AlertContextProvider>
      </AuthContextProvider>
   </React.StrictMode>,
   document.getElementById('root')
);

