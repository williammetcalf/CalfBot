import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import React from "react";

const BackButton = props => {
  const { match, location, history, staticContext, ...restProps } = props;
  return <Button {...restProps} onClick={() => history.goBack()} />;
};

export default withRouter(BackButton);
