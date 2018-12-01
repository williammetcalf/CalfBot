import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import UserService from '../../../../services/userService';

class UserMenu extends React.Component {
  state = { anchorEl: null };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <UserMenuContainer>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              UserService.getInstance().logout();
              this.handleClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </UserMenuContainer>
    );
  }
}

const UserMenuContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

export default UserMenu;
