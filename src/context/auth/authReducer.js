import {
   REGISTER_SUCCESS,
   REGISTER_FAILED,
   LOAD_USER,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGOUT
} from "../types"
import jwt_decode from "jwt-decode"

export default function authReducer(state, action) {

   switch (action.type) {
      case REGISTER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            message: {
               status: action.payload.status,
               msg: action.payload.data
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
            message: {
               status: action.payload.status,
               msg: action.payload.data
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
            message: {
               status: action.payload.status || 500,
               msg: action.payload.data
            },
            authUser: {},
         }

      case LOAD_USER:

         return {
            ...state,
            isAuth: true,
            isLoading: false,
            roles: action.payload.roles,
            message: {
               status: action.payload.response.status,
               msg: action.payload.response.statusText
            },
            authUser: {
               ...action.payload.response.data
            },
         }

      default:
         return state
   }
}