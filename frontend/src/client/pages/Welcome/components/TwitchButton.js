import React from "react";

import { LoadingButton } from "../../../components";
import { TwitchThemeProvider } from "../../../themes";
import { twitchAuth } from "../../../services/oauth";
import UserService from "../../../services/userService";

class TwitchButton extends React.Component {
  state = { authenticating: false, authenticated: false, error: undefined };

  handleClick = async () => {
    this.setState({ authenticating: true });

    try {
      const token = await twitchAuth();
      this.setState({
        authenticating: false,
        authenticated: true,
        error: null
      });

      UserService.getInstance().login(token);
    } catch (e) {
      this.setState({
        authenticating: false,
        authenticated: false
      });
    }
  };

  render() {
    const { authenticated, authenticating, error } = this.state;

    return (
      <TwitchThemeProvider>
        <LoadingButton
          ButtonProps={{
            variant: "contained",
            color: "primary",
            onClick: this.handleClick
          }}
          loading={authenticating}
          complete={authenticated ? "Success!" : undefined}
          error={error}
        >
          Connect to Twitch
        </LoadingButton>
      </TwitchThemeProvider>
    );
  }
}

export default TwitchButton;
