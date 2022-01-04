import {ThemeProvider} from "styled-components";

const theme = {
   colors: {
      darkGray: "#232F2F",
      red: "#A04340",
      lightGray: "#C6C7BC",
      green: "#8B9678",
      white: "#F1F2EC",
      black: "#111111"
   },

   settings:{
      maxWidth: `1000px`
   }
};


export default function StyledThemesProvider({children}) {
   return (<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}