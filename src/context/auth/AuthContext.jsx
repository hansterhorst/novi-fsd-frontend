import {createContext, useEffect, useReducer} from "react";
import authReducer from "./authReducer";
import {
   AUTH_ERROR,
   LOAD_USER,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   REGISTER_FAILED,
   REGISTER_SUCCESS,
   LOGOUT,
   CLEAR_ERRORS
} from "../types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {BASE_URL, USERS_BASE_URL} from "../../utils/constants";
import Loading from "../../components/loading/Loading";
import LoadingIcon from "../../components/loading/LoadingIcon";

const initialState = {
   isAuth: false,
   isLoading: true,
   roles: [],
   token: localStorage.getItem("token"),
   response: {status: null, message: ''},
   authUser: {}
}


export const AuthContext = createContext(initialState)

export default function AuthContextProvider({children}) {

   const [state, dispatch] = useReducer(authReducer, initialState)


   useEffect(() => {
      loadUser()
   }, [])


   // load user
   async function loadUser() {

      const token = localStorage.getItem('token')

      if (token) {

         const tokenData = jwt_decode(token)
         const email = tokenData.sub
         const roles = tokenData.roles


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

            dispatch({
               type: LOAD_USER,
               payload: {response, roles}
            })

         } catch (error) {

            console.log(error.response)

            dispatch({
               type: AUTH_ERROR,
               payload: error
            })
         }

      } else {

         dispatch({
            type: AUTH_ERROR,
            payload: {data: "Invalid Token"}
         })
      }
   }

   // register user
   async function registerUser(formData) {

      try {
         const response = await axios.post(`${BASE_URL}/auth/register`, formData)

         dispatch({
            type: REGISTER_SUCCESS,
            payload: response
         })


      } catch (error) {

         dispatch({
            type: REGISTER_FAILED,
            payload: error.response.data
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
            payload: error.response.data
         })
      }

   }

   async function logoutUser() {
      dispatch({
         type: LOGOUT,
         payload: {
            status: 200,
            message: "Gebruiker uitgelogd"
         }
      })
   }

   function clearErrors() {
      dispatch({
         type: CLEAR_ERRORS,
         payload: []
      })
   }


   return (
      <AuthContext.Provider
         value={{
            authUser: state.authUser,
            token: state.token,
            isAuth: state.isAuth,
            isLoading: state.isLoading,
            message: state.response,
            roles: state.roles,
            registerUser,
            loginUser,
            loadUser,
            logoutUser,
            clearErrors
         }}>
         {(!state.isLoading) ? children :
            <Loading><LoadingIcon/></Loading>}

      </AuthContext.Provider>
   )
}