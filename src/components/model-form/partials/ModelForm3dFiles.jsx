import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { tw } from 'twind';
import { Controller } from 'react-hook-form';
import FileInput from '../../form/inputs/FileInput';
import Input from '../../form/inputs/Input';
import ModelInfoInput from './ModelInfoInput';
import SubmitButton from '../../form/inputs/SubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModelFormSchemaStep2 } from '../validation.schema';

const ModelForm3dFiles = ({ sectionStyle, onButtonClick, getButtonText }) => {
  const { register, handleSubmit, control, errors, setValue } = useForm({
    resolver: yupResolver(ModelFormSchemaStep2),
  });
  const [customMetadataKeys, setCustomMetadataKeys] = useState([]);
  const [keyName, setKeyName] = useState('');

  const addNewInfo = () => {
    setCustomMetadataKeys([...customMetadataKeys, keyName]);
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
              acceptedFileTypes={['.stl', '.mtl', '.obj', '.zip', '.dae']}
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
            />
          )}
        />
      </div>
      <div>
        <p className={sectionStyle}>Add some model related information</p>
        <ModelInfoInput
          id="quads"
          name="metadata.quads"
          label="Quads"
          register={register}
          errors={errors}
        />
        <ModelInfoInput
          id="polygons"
          name="metadata.polygons"
          label="Polygons"
          register={register}
          errors={errors}
        />
        <ModelInfoInput
          id="triangles"
          name="metadata.triangles"
          label="Total triangles"
          register={register}
          errors={errors}
        />
        {customMetadataKeys.map((key) => (
          <ModelInfoInput
            id={key}
            key={key}
            name={`metadata.${key}`}
            label={key}
            register={register}
            errors={errors}
          />
        ))}
        <div>
          <p className={sectionStyle}>
            Add custom information as key: value pair
          </p>
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
};

export default ModelForm3dFiles;
