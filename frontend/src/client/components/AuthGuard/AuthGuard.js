import React from 'react';
import UserService from '../../services/userService';
import { withRouter } from 'react-router';

const withAuth = (Component, onNoAuth) => {
  class AuthentiactedComponent extends React.Component {
    componentDidMount() {
      this.sub = UserService.getInstance().$user.subscribe((auth) => {
        if (!auth) {
          onNoAuth() || this.props.history.push('/');
        }
      });
    }

    componentWillUnmount() {
      this.sub && this.sub.unsubscribe();
    }

    render() {
      return <Component />;
    }
  }

  return withRouter(AuthentiactedComponent);
};

export default withAuth;
