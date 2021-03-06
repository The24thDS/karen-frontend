import React from 'react';
import PropTypes from 'prop-types';
import { tw } from 'twind';

const NavItem = ({ children, addClassNames, ...rest }) => {
  return (
    <li
      className={tw(
        `
        text(gray-100 lg hover:gray-900)  hover:(bg-gray-100)
        px-4 h-full flex items-center font-semibold relative`,
        addClassNames
      )}
      {...rest}
    >
      {children}
    </li>
  );
};

NavItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  addClassNames: PropTypes.string,
};

export default NavItem;
