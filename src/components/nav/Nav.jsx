import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserLoggedIn } from '../../state/selectors/users.selectors';

const Nav = ({ isLoggedIn }) => {
  return (
    <nav className="flex mx-auto w-1/2 justify-between pt-2">
      <Link className="text-blue-700" to="/models">
        Models List
      </Link>
      {isLoggedIn && (
        <Link className="text-blue-700" to="/models/new">
          Upload Model
        </Link>
      )}
      {!isLoggedIn && (
        <Link className="text-blue-700" to="/login">
          Login
        </Link>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectUserLoggedIn(state),
  };
};

export default connect(mapStateToProps)(Nav);
