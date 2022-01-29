import {ThemeProvider} from "styled-components";

const theme = {
   colors: {
      darkGray: "#232F2F",
      red: "#A04340",
      lightGray: "#C6C7BC",
      green: "#8B9678",
      darkGreen: "#7D876C",
      white: "#F1F2EC",
      black: "#111111"
   },

   settings:{
      maxWidth: `1000px`
   },

   breakpoints:{
      xs: `(max-width: 320px)`,
      sm: `(max-width: 576px)`,
      md: `(max-width: 768px)`,
      lg: `(max-width: 992px)`,
   }
};


export default function StyledThemesProvider({children}) {
   return (<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}