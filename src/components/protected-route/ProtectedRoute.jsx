import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserLoggedIn } from 'state/selectors/users.selectors';

const ProtectedRoute = ({ component: Component, reversed, ...rest }) => {
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const isAllowed = reversed ? !isLoggedIn : isLoggedIn;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAllowed ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  reversed: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  reversed: false,
};

export default ProtectedRoute;
