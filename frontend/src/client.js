import BrowserRouter from "react-router-dom/BrowserRouter";
import JssProvider from "react-jss/lib/JssProvider";
import React from "react";
import ReactDOM from "react-dom";

import { createGenerateClassName } from "@material-ui/core/styles";
import App from "./client/App";
import { PrimaryThemeProvider } from "./client/themes";
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

const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <PrimaryThemeProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </PrimaryThemeProvider>
  </JssProvider>,
  document.querySelector("#root")
);

if (module.hot) {
  module.hot.accept();
}
