import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";

export const twitchTheme = createMuiTheme({
  typography: {
    fontFamily: [`"Roboto"`, "sans-serif"],
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#6441A4"
    },
    secondary: {
      main: "#fff"
    }
  }
});

export default ({ children }) => (
  <MuiThemeProvider theme={twitchTheme}>{children}</MuiThemeProvider>
);
