import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message, className = '', ...rest }) => {
  return (
    <div className={`flex items-center py-1 pt-2 pl-1 ${className}`} {...rest}>
      <div className='p-1 text-red-700 bg-red-200 rounded-full fill-current'>
        <svg
          className='w-4 h-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>
      <p className='ml-3 text-sm font-medium text-red-700'>
        {message[0].toUpperCase() + message.slice(1)}
      </p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Error.defaultProps = {
  className: '',
};

export default Error;
