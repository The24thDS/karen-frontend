import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ text, classNames, ...rest }) => {
  return (
    <input
      type="submit"
      value={text}
      className={`mt-3 text-lg font-semibold cursor-pointer
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black ${classNames}`}
      {...rest}
    />
  );
};

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};

SubmitButton.defaultProps = {
  text: 'Submit',
};

export default SubmitButton;
