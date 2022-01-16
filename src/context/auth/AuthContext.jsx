import {createContext, useReducer} from "react";
import authReducer from "./authReducer";
import {
   AUTH_ERROR,
   LOAD_USER,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   REGISTER_FAILED,
   REGISTER_SUCCESS,
   LOGOUT
} from "../types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {BASE_URL, USERS_BASE_URL} from "../../utils/constants";

const initialState = {
   isAuth: false,
   isLoading: true,
   roles: [],
   token: localStorage.getItem("token"),
   message: {status: null, msg: ''},
   authUser: {}
}


export const AuthContext = createContext(initialState)

export default function AuthContextProvider({children}) {

   const [state, dispatch] = useReducer(authReducer, initialState)


   // load user
   async function loadUser() {

      const email = jwt_decode(localStorage.getItem('token')).sub

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
         params: {
            email
         }
      }

      try {
         const response = await axios.get(`${USERS_BASE_URL}/user`, config)

         console.log(response)

         dispatch({
            type: LOAD_USER,
            payload: response
         })


      } catch (error) {

         dispatch({
            type: AUTH_ERROR,
            payload: error.response
         })
      }
   }

   // register user
   async function registerUser(formData) {

      try {
         const response = await axios.post(`${BASE_URL}/auth/register`, formData)
         console.log(response)

         dispatch({
            type: REGISTER_SUCCESS,
            payload: response
         })


      } catch (error) {

         dispatch({
            type: REGISTER_FAILED,
            payload: error.response
         })
      }
   }

   // login user
   async function loginUser(formData) {

      try {
         const response = await axios.post(`${BASE_URL}/auth/login`, formData);

         dispatch({
            type: LOGIN_SUCCESS,
            payload: response
         })

         await loadUser()


      } catch (error) {
         console.log(error.response)

         dispatch({
            type: LOGIN_FAILED,
            payload: error.response
         })
      }

   }

   async function logoutUser() {
      console.log("logout")
      dispatch({
         type: LOGOUT,
         payload: {
            status: 200,
            msg: "User logout"
         }
      })
   }


   return (
      <AuthContext.Provider
         value={{
            authUser: state.authUser,
            token: state.token,
            isAuth: state.isAuth,
            isLoading: state.isLoading,
            message: state.message,
            roles: state.roles,
            registerUser,
            loginUser,
            loadUser,
            logoutUser,
         }}>
         {children}
      </AuthContext.Provider>
   )
}