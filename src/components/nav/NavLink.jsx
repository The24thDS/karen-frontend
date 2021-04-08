import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { tw } from 'twind';

const NavLink = ({ children, to, ...rest }) => {
  return (
    <Link
      className={tw`
        text(gray-100 lg hover:gray-900)  hover:(bg-gray-100)
        px-4 h-full flex items-center font-semibold`}
      to={to}
      {...rest}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavLink;
