import {createContext, useReducer} from "react";
import {SET_ALERT, REMOVE_ALERT} from "../types"
import alertReducer from "./alertReducer";
import {v4 as UUIDv4} from 'uuid';

const INITIAL_STATE = []

export const AlertContext = createContext(INITIAL_STATE)

export function AlertContextProvider({children}) {

   const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE);


   function setAlert(message = [], statusCode = 200, isError = false) {
      const id = UUIDv4()
      dispatch({
         type: SET_ALERT,
         payload: {message, statusCode, isError, id}
      })

      setTimeout(() => {
         dispatch({
            type: REMOVE_ALERT,
            payload: id
         })
      }, 5000)
   }


   return (
      <AlertContext.Provider value={{
         alerts: state,
         setAlert,
      }}>
         {children}
      </AlertContext.Provider>
   )
}