import React from 'react';

import { LoadingButton } from '../../../components';
import { TwitchThemeProvider } from '../../../themes';
import { twitchAuth } from '../../../services/oauth';
import UserService from '../../../services/userService';

class TwitchButton extends React.Component {
  state = { authenticating: false, authenticated: false };

  handleClick = async () => {
    this.setState({ authenticating: true });

    const token = await twitchAuth();
    this.setState({ authenticating: false, authenticated: true });

    UserService.getInstance().login(token);
  };

  render() {
    const { authenticated, authenticating } = this.state;

    return (
      <TwitchThemeProvider>
        <LoadingButton
          ButtonProps={{
            variant: 'contained',
            color: 'primary',
            onClick: this.handleClick,
          }}
          loading={authenticating}
          complete={authenticated ? 'Success!' : undefined}
        >
          Connect to Twitch
        </LoadingButton>
      </TwitchThemeProvider>
    );
  }
}

export default TwitchButton;
