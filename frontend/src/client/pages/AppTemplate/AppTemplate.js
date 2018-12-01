import React from 'react';

import { PrimaryThemeProvider } from '../../themes';
import UserService from '../../services/userService';
import './AppTemplate.css';

class AppTemplate extends React.Component {
  componentDidMount() {
    const userService = UserService.getInstance();
    userService.$user.subscribe((auth) => {
      console.log(auth);
    });
  }

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
