import React from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import Error from '../../error/Error';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugin
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

function FileInput(props) {
  const {
    id,
    name,
    label,
    classNames,
    errors,
    onFilesUpdated,
    ...rest
  } = props;

  return (
    <div
      className={`p-2 flex flex-col text-left ${classNames?.container || ''}`}
    >
      <label
        htmlFor={id}
        className={`px-1 text-sm text-gray-600 ${classNames?.label || ''}`}
      >
        {label}
      </label>
      <FilePond
        {...rest}
        allowMultiple={true}
        onupdatefiles={(files) => {
          onFilesUpdated(files);
        }}
      />
      {errors && <Error message={errors.message} />}
    </div>
  );
}

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
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
  onFilesUpdated: PropTypes.func.isRequired,
};

FileInput.defaultProps = {
  name: '',
  label: '',
};

export default FileInput;
