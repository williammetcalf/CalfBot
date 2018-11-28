import React from "react";

import { PrimaryThemeProvider } from "../../themes";

import "./AppTemplate.css";

class AppTemplate extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <PrimaryThemeProvider>
        <div className="AppTemplate">{children}</div>
      </PrimaryThemeProvider>
    );
  }
}

export default AppTemplate;
