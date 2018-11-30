import React from "react";
import ReactDOM from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import BrowserRouter from "react-router-dom/BrowserRouter";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import App from "./client/App";

class Main extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />;
  }
}

const theme = createMuiTheme({});
const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </MuiThemeProvider>
  </JssProvider>,
  document.querySelector("#root")
);

if (module.hot) {
  module.hot.accept();
}
