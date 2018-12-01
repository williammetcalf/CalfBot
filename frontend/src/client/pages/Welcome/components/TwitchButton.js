import React from 'react';

import { LoadingButton } from '../../../components';
import { TwitchThemeProvider } from '../../../themes';
import { twitchAuth } from '../../../services/oauth';
import UserService from '../../../services/userService';

class TwitchButton extends React.Component {
  state = { authenticating: false };

  handleClick = async () => {
    this.setState({ authenticating: true });

    const token = await twitchAuth();
    this.setState({ authenticating: false });

    UserService.getInstance().login(token);
  };

  render() {
    return (
      <TwitchThemeProvider>
        <LoadingButton
          ButtonProps={{
            variant: 'contained',
            color: 'primary',
            onClick: this.handleClick,
          }}
          loading={this.state.authenticating}
        >
          Connect to Twitch
        </LoadingButton>
      </TwitchThemeProvider>
    );
  }
}

export default TwitchButton;
