import React from "react";

import { LoadingButton } from "../../../components";
import { TwitchThemeProvider } from "../../../themes";

class TwitchButton extends React.Component {
  state = { authenticating: false };

  handleClick = () => {
    this.setState({ authenticating: !this.state.authenticating });

    console.log(window.env);
    const codeUri =
      `https://id.twitch.tv/oauth2/authorize?` +
      `client_id=${window.env.twitch.clientId}&` +
      `redirect_uri=${window.env.twitch.redirectUri}&` +
      `response_type=code&` +
      `scope=openid user_read&`;

    const authWindow = window.open(codeUri);

    setInterval(() => {
      if (authWindow && authWindow.location) {
        console.log(authWindow.location.search);
      }
    }, 200);
  };

  render() {
    return (
      <TwitchThemeProvider>
        <LoadingButton
          ButtonProps={{
            variant: "contained",
            color: "primary",
            onClick: this.handleClick
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
