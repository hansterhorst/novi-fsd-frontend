import {
   REGISTER_SUCCESS,
   REGISTER_FAILED,
   LOAD_USER,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGOUT, LOGIN_FAILED
} from "../types"
import jwt_decode from "jwt-decode"

export default function authReducer(state, action) {

   switch (action.type) {
      case REGISTER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            response: {
               status: action.payload.status,
               message: action.payload.data
            }
         }
      case LOGIN_SUCCESS:
         const token = action.payload.data.accessToken

         localStorage.setItem("token", token)
         const decodeData = jwt_decode(token)

         return {
            ...state,
            isAuth: true,
            isLoading: false,
            roles: decodeData.roles,
            token: token,
            response: {
               status: action.payload.status,
               message: action.payload.data
            },
            authUser: {
               email: decodeData.sub,
            },
         }

      case REGISTER_FAILED:
      case AUTH_ERROR:
      case LOGOUT:
         localStorage.removeItem("token")

         return {
            ...state,
            isAuth: false,
            isLoading: false,
            roles: [],
            token: null,
            response: {
               status: action.payload.status || 500,
               message: action.payload.data
            },
            authUser: {},
         }

      case LOGIN_FAILED:
         localStorage.removeItem("token")

         return {
            ...state,
            isAuth: false,
            isLoading: false,
            roles: [],
            token: null,
            response: {
               status: action.payload.status,
               message: action.payload.data.message
            },
            authUser: {},
         }
      case LOAD_USER:

         return {
            ...state,
            isAuth: true,
            isLoading: false,
            roles: action.payload.roles,
            response: {
               status: action.payload.response.status,
               message: action.payload.response.statusText
            },
            authUser: {
               ...action.payload.response.data
            },
         }

      default:
         return state
   }
}