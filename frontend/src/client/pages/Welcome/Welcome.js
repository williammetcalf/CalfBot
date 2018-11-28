import React from "react";
import Typography from "@material-ui/core/Typography";

import { WelcomeContainer } from "./components";
import { LoadingButton } from "../../components";
import { TwitchThemeProvider } from "../../themes";

class Welcome extends React.Component {
  state = { authenticating: false };
  render() {
    return (
      <WelcomeContainer>
        <Typography
          variant="h2"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          Welcome to CalfBot
        </Typography>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: 5, maxWidth: 500 }}
        >
          You must first authenticate with Twitch in order for CalfBot to join
          your channel
        </Typography>
        <TwitchThemeProvider>
          <LoadingButton
            ButtonProps={{
              variant: "contained",
              color: "primary",
              onClick: () =>
                this.setState({ authenticating: !this.state.authenticating })
            }}
            loading={this.state.authenticating}
          >
            Connect to Twitch
          </LoadingButton>
        </TwitchThemeProvider>
      </WelcomeContainer>
    );
  }
}

export default Welcome;
