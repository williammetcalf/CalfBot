import React from "react";

import "./AppTemplate.css";

class AppTemplate extends React.Component {
  render() {
    const { children } = this.props;
    return <div className="AppTemplate">{children}</div>;
  }
}

export default AppTemplate;
