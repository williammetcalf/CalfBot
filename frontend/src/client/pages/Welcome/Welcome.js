import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";

import { LoadingButton } from "../../components";
import { TwitchThemeProvider } from "../../themes";
import { WelcomeContainer } from "./components";

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
          style={{ textAlign: "center", marginBottom: 15, maxWidth: 500 }}
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
        <div style={{ flexGrow: 1 }} />
        <Button
          style={{ marginTop: 20, marginBottom: 20 }}
          variant="outlined"
          component={Link}
          to="/about"
        >
          more info
        </Button>
      </WelcomeContainer>
    );
  }
}

export default Welcome;
