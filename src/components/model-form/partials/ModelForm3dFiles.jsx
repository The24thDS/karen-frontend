import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { tw } from 'twind';
import { Controller } from 'react-hook-form';
import FileInput from '../../form/inputs/FileInput';
import Input from '../../form/inputs/Input';
import ModelInfoInput from './ModelInfoInput';
import SubmitButton from '../../form/inputs/SubmitButton';
import Error from '../../error/Error';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModelFormSchemaStep2 } from '../validation.schema';

const ModelForm3dFiles = ({ sectionStyle, onButtonClick, getButtonText }) => {
  const { register, handleSubmit, control, errors, setValue } = useForm({
    resolver: yupResolver(ModelFormSchemaStep2),
  });
  const [customMetadataKeys, setCustomMetadataKeys] = useState([]);
  const [keyName, setKeyName] = useState('');
  const acceptedFileTypes = ['.stl', '.mtl', '.obj', '.zip', '.dae', '.fbx'];

  const addNewInfo = () => {
    setCustomMetadataKeys([
      ...customMetadataKeys,
      keyName.toLowerCase().trim().replace(' ', '-'),
    ]);
  };

  return (
    <form
      onSubmit={handleSubmit(onButtonClick)}
      className={tw`grid(& cols-1 lg:cols-2) gap-4 mt-8`}
    >
      <div>
        <p className={sectionStyle}>
          Choose the files that will be available to download
        </p>
        <Controller
          name="models"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <FileInput
              {...field}
              id="models"
              allowMultiple={true}
              allowFileTypeValidation={false}
              acceptedFileTypes={acceptedFileTypes}
              errors={errors.models}
              onFilesUpdated={(files) => {
                setValue(
                  'models',
                  files.map((fileObj) => fileObj.file)
                );
              }}
            />
          )}
        />
        <p className={sectionStyle}>
          Add a GLTF file and its images to activate the 3D preview
        </p>
        <Controller
          name="gltf"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <FileInput
              {...field}
              id="gltf"
              errors={errors.gltf}
              onFilesUpdated={(files) => {
                setValue(
                  'gltf',
                  files.map((fileObj) => fileObj.file)
                );
              }}
              renderErrors={(gltfErrors) => {
                if (gltfErrors.type === 'valid') {
                  const errorMessages = JSON.parse(gltfErrors.message);
                  return (
                    <>
                      {errorMessages.map((msg, idx) => (
                        <Error key={msg + idx} message={msg} />
                      ))}
                    </>
                  );
                } else {
                  return <Error message={gltfErrors.message} />;
                }
              }}
            />
          )}
        />
      </div>
      <div>
        <p className={sectionStyle}>Add some model related information</p>
        <p className={`${sectionStyle} text-sm`}>
          Total triangle count and total vertex count will be determined on the
          server.
        </p>
        {customMetadataKeys.map((key) => (
          <ModelInfoInput
            id={key}
            key={key}
            name={`metadata.${key}`}
            label={key.slice(0, 1).toUpperCase() + key.slice(1)}
            register={register}
            errors={errors}
          />
        ))}
        <div>
          <div className="flex items-center">
            <Input
              id="key"
              placeholder="Type the key name and press add"
              classNames={{ container: 'flex-grow' }}
              onChange={({ target: { value } }) => {
                setKeyName(value);
              }}
            />
            <input
              type="button"
              value="Add"
              className="p-2 rounded shadow-md cursor-pointer"
              onClick={() => addNewInfo()}
            />
          </div>
        </div>
        <SubmitButton text={getButtonText()} />
      </div>
    </form>
  );
};

ModelForm3dFiles.propTypes = {
  sectionStyle: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  getButtonText: PropTypes.func.isRequired,
};

export default ModelForm3dFiles;
