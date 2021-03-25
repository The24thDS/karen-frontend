import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from '../../error/Error';

function FileInput(props) {
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

  const [inputStats, setInputStats] = useState({
    count: 0,
    names: [],
  });

  const onChange = ({ target: { files } }) => {
    const names = [];
    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
    }
    setInputStats({
      names,
      count: files.length,
    });
  };

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
      <div
        className={`text-md px-3 py-2 mt-1 rounded-lg w-full relative
                flex flex-col justify-center items-center
                bg-white border-2 border-gray-300 border-dashed
                shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 
                focus:outline-none`}
      >
        <p className="text-gray-600 font-semibold">
          Click here to select your files
        </p>
        {inputStats.count > 0 && (
          <>
            <div className="text-sm text-gray-800 font-semibold text-center">
              <p>
                {inputStats.count} selected file
                {inputStats.count > 1 ? 's' : ''}:
              </p>
              <ul className="text-left font-normal text-xs list-disc">
                {inputStats.names.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </div>
          </>
        )}
        <input
          id={id}
          type="file"
          name={name}
          className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
          ref={register}
          onChange={onChange}
          {...rest}
        />
      </div>
      {errors && <Error message={errors.message} />}
    </div>
  );
}

FileInput.propTypes = {
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

FileInput.defaultProps = {
  type: 'text',
  name: '',
  label: '',
};

export default FileInput;
