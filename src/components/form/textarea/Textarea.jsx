import React from 'react';
import PropTypes from 'prop-types';

import Error from '../../error/Error';

const Textarea = ({
  id,
  name,
  label,
  classNames,
  register,
  errors,
  ...rest
}) => {
  return (
    <div
      className={`p-2 flex flex-col text-left ${classNames?.container || ''}`}
    >
      <label
        htmlFor={id}
        className={`px-1 text-sm text-gray-600 ${classNames?.container || ''}`}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={`text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none ${
                  classNames?.textarea || ''
                }`}
        ref={register}
        {...rest}
      ></textarea>
      {errors && <Error message={errors.message} />}
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    textarea: PropTypes.string,
    label: PropTypes.string,
    container: PropTypes.string,
  }),
};

export default Textarea;
