import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoadingContainer = ({ loading, render, ...props }) => {
  if (!loading) return render();

  return (
    <SpinnerContainer>
      <CircularProgress color="primary" size={50} {...props} />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

LoadingContainer.defaultProps = {
  loading: false,
  render: () => <div />
};

LoadingContainer.propTypes = {
  loading: PropTypes.bool,
  render: PropTypes.func
};

export default LoadingContainer;
