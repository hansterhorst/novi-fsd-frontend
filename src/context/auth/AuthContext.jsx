import {createContext, useReducer} from "react";
import authReducer from "./authReducer";

const initialState = {
   user: {
      isAuth: true,
      userId: 11,
      firstname: 'Hans',
      lastname: 'ter Horst',
      email: 'hans@mail.com',
      username: 'hans@mail.com',
      password: '123',
      bio: 'Kom uit het prachtige Twente, het plaatsje Delden dat omringd is met bossen van landgoed Twickel. Mijn hele leven al gek van fietsen, vooral op de mountainbike. Laatste jaren verken de wereld op een volgepakte fiets, dat mij na uitzonderlijke plaatsen brengt.',
      profileImage: 'https://robohash.org/hans',
      roles: ['USER', 'ADMIN'],
   }
}

export const AuthContext = createContext(initialState)

export default function AuthContextProvider({children}) {

   const [state, dispatch] = useReducer(authReducer, initialState)

   return (
      <AuthContext.Provider
         value={{authUser: state.user}}>
         {children}
      </AuthContext.Provider>
   )
}