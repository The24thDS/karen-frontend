import React from 'react';
import PropTypes from 'prop-types';
import { tw } from 'twind';

const DownloadButton = ({ link, icon, size, label }) => {
  return (
    <button
      className={tw`bg(green-500 hover:green-700) text-white font-bold rounded relative m-1`}
    >
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={tw`block py-1 px-2`}
      >
        {icon}
        {label}
        {size && (
          <i
            className={tw`ml-2 px-1 py-1 font-semibold text(xs black) inline-block bg-green-200 rounded`}
          >
            {size}
          </i>
        )}
      </a>
    </button>
  );
};

DownloadButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
};

export default DownloadButton;
