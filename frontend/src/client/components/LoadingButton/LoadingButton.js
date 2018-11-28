import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

class LoadingButton extends React.Component {
  state = { buttonWidth: undefined };
  renderAction() {
    return this.props.children;
  }

  renderLoading() {
    return <CircularProgress color="secondary" size={20} />;
  }

  renderLoaded() {
    const { children, error, complete } = this.props;
    if (error) return error;
    if (complete) return complete;
    return children;
  }

  setButtonWidth = ref => {
    if (!this.state.buttonWidth) {
      this.setState({ buttonWidth: ref.clientWidth });
    }
  };

  render() {
    const { ButtonProps, loading } = this.props;
    const style = {
      width: "100%",
      height: 36,
      whiteSpace: "nowrap",
      overflow: "hidden",
      ...(ButtonProps.style || {})
    };
    return (
      <LoadingButtonWrapper
        className={(loading && "loading") || null}
        ref={this.setButtonWidth}
        width={this.state.buttonWidth}
      >
        <Button {...ButtonProps} style={style}>
          {loading ? this.renderLoading() : this.renderLoaded()}
        </Button>
      </LoadingButtonWrapper>
    );
  }
}

const LoadingButtonWrapper = styled.div`
  transition: width 0.4s;
  width: ${({ width }) => (width ? `${width}px` : "unset")};
  &.loading {
    width: 64px;
  }
`;

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  complete: PropTypes.string,
  error: PropTypes.string
};

LoadingButton.defaultProps = {
  loading: false
};

export default LoadingButton;
