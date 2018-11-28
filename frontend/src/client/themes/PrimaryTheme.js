import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";

export const primaryTheme = createMuiTheme({
  typography: {
    fontFamily: [`"Roboto"`, "sans-serif"],
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#123456"
    }
  }
});

export default ({ children }) => (
  <MuiThemeProvider theme={primaryTheme}>{children}</MuiThemeProvider>
);
