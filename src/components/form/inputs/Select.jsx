import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const stringToSelectOption = (string) => ({
  name: string,
  value: string,
});

const Select = ({
  id,
  name,
  label,
  multiple = false,
  options = [],
  register,
}) => {
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    setSelectOptions(
      options.map((o) => (typeof o === 'string' ? stringToSelectOption(o) : o))
    );
  }, [options]);

  return (
    <div className={`p-2 flex flex-col text-left`}>
      <label htmlFor={id} className={`px-1 text-sm text-gray-600`}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        multiple={multiple}
        className={`text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none`}
        ref={register}
      >
        {selectOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
};

export default Select;
