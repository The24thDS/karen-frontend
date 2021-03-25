import React from 'react';
import PropTypes from 'prop-types';
import Error from '../../error/Error';

function Input(props) {
  const {
    id,
    type,
    name,
    label,
    classNames,
    register,
    errors,
    ...rest
  } = props;

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
      <input
        id={id}
        type={type}
        name={name}
        className={`text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none ${
                  classNames?.input || ''
                }`}
        ref={register}
        {...rest}
      />
      {errors && <Error message={errors.message} />}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  classNames: PropTypes.shape({
    input: PropTypes.string,
    label: PropTypes.string,
    container: PropTypes.string,
  }),
};

Input.defaultProps = {
  type: 'text',
  name: '',
  label: '',
};

export default Input;
