import React from 'react';
import PropTypes from 'prop-types';

function Error({ message, className, ...rest }) {
  return (
    <div className={`flex items-center py-1 pt-2 pl-1 ${className}`} {...rest}>
      <div className="bg-red-200 text-red-700 rounded-full p-1 fill-current">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <p className="text-red-700 font-medium text-sm ml-3">
        {message[0].toUpperCase() + message.slice(1)}
      </p>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
