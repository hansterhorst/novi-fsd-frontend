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
         localStorage.setItem("token", action.payload.data.accessToken)

         const decodeData = jwt_decode(action.payload.data.accessToken)

         return {
            ...state,
            isAuth: true,
            isLoading: false,
            roles: decodeData.roles,
            token: action.payload.data.accessToken,
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
               status: action.payload.status,
               msg: action.payload.data
            },
            authUser: {},
         }

      case LOAD_USER:
         console.log(action.payload)

         return {
            ...state,
            message: {
               status: action.payload.status,
               msg: action.payload.data
            },
            authUser: {
               ...action.payload.data
            },
         }

      default:
         return state
   }
}