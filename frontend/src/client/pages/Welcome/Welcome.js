import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

import { TwitchButton, WelcomeContainer } from './components';
import UserService from '../../services/userService';

class Welcome extends React.Component {
  componentDidMount() {
    this.sub = UserService.getInstance().$user.subscribe((auth) => {
      if (!!auth) {
        this.props.history.push('/home');
      }
    });
  }

  componentWillUnmount() {
    this.sub && this.sub.unsubscribe();
  }

  render() {
    return (
      <WelcomeContainer>
        <Typography
          variant="h2"
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          Welcome to CalfBot
        </Typography>
        <Typography
          variant="h5"
          style={{ textAlign: 'center', marginBottom: 15, maxWidth: 500 }}
        >
          You must first authenticate with Twitch in order for CalfBot to join
          your channel
        </Typography>
        <TwitchButton />
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

export default withRouter(Welcome);
