import React from 'react';

import { PrimaryThemeProvider } from '../../themes';
import UserService from '../../services/userService';
import UserMenu from './components/UserMenu/UserMenu';
import './AppTemplate.css';

class AppTemplate extends React.Component {
  state = { authenticated: false };
  componentDidMount() {
    const userService = UserService.getInstance();
    userService.$user.subscribe((auth) => {
      this.setState({ authenticated: !!auth });
    });
  }

  render() {
    const { children } = this.props;
    return (
      <PrimaryThemeProvider>
        {this.state.authenticated && <UserMenu />}
        <div className="AppTemplate">{children}</div>
      </PrimaryThemeProvider>
    );
  }
}

export default AppTemplate;
