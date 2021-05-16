import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { selectUserLoggedIn } from "state/selectors/users.selectors";

const ProtectedRoute = ({
  component: Component,
  isLoggedIn,
  reversed,
  ...rest
}) => {
  const isAllowed = reversed ? !isLoggedIn : isLoggedIn;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAllowed ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: selectUserLoggedIn(state),
});

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  reversed: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  reversed: false,
};

export default connect(mapStateToProps)(ProtectedRoute);
