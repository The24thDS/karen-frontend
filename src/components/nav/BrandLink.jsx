import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { tw } from 'twind';

const BrandLink = ({ children, to }) => {
  return (
    <Link
      className={tw`text(gray-100 4xl) font-bold px-4 h-full flex items-center`}
      to={to}
    >
      {children}
    </Link>
  );
};

BrandLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default BrandLink;
