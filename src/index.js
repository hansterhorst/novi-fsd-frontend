import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import AuthContextProvider from "./context/auth/AuthContext";
import ResetCSS from "./styles/ResetCSS";

ReactDOM.render(
   <React.StrictMode>
      <ResetCSS/>
      <AuthContextProvider>
         <BrowserRouter>
            <App/>
         </BrowserRouter>
      </AuthContextProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
