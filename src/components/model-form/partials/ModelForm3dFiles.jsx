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
import {
  gltfFileInputServerConfig,
  modelsFileInputServerConfig,
} from '../file-inputs-server-configs';
import {
  useCustomMetadataVales,
  useInitialModelFiles,
  useInitialModelGltf,
} from '../custom-hooks';
const validator = require('gltf-validator');

const ModelForm3dFiles = ({
  initialModel,
  sectionStyle,
  onButtonClick,
  getButtonText,
}) => {
  const { register, handleSubmit, control, errors, setValue, getValues } =
    useForm({
      resolver: yupResolver(ModelFormSchemaStep2),
    });
  const [customMetadataKeys, setCustomMetadataKeys] = useState(
    Object.keys(initialModel?.model?.metadata) ?? []
  );
  const [keyName, setKeyName] = useState('');
  useCustomMetadataVales(setValue, initialModel);
  const initialFiles = useInitialModelFiles(initialModel);
  const initialGltfFiles = useInitialModelGltf(initialModel);
  const [modelFiles, setModelFiles] = useState(initialFiles);
  const [gltfFiles, setGltfFiles] = useState(initialGltfFiles);
  const acceptedFileTypes = ['.stl', '.mtl', '.obj', '.zip', '.dae', '.fbx'];

  const addNewInfo = () => {
    setCustomMetadataKeys([
      ...customMetadataKeys,
      keyName.toLowerCase().trim().replace(' ', '-'),
    ]);
  };

  const getResourceFilesFromGltf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await validator.validateBytes(new Uint8Array(arrayBuffer), {
      externalResourceFunction: (uri) =>
        new Promise((resolve, reject) => reject('')),
    });
    const resources = result.info.resources.map((resource) => ({
      source: resource.uri,
      options: { type: 'local' },
    }));
    setGltfFiles([...gltfFiles, ...resources]);
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
              server={modelsFileInputServerConfig(
                getValues,
                initialModel?.model?.slug,
                initialModel?.user?.username
              )}
              files={modelFiles}
              id="models"
              name="models"
              allowMultiple={true}
              allowFileTypeValidation={false}
              acceptedFileTypes={acceptedFileTypes}
              errors={errors.models}
              onprocessfile={(error, file) => {
                if (error === null) {
                  setValue('models', [
                    ...getValues('models'),
                    { id: file.serverId, name: file.filename },
                  ]);
                }
              }}
              onremovefile={(error, file) => {
                if (error === null) {
                  setValue(
                    'models',
                    getValues('models').filter(
                      (img) => img.id !== file.serverId
                    )
                  );
                }
              }}
              onaddfile={(error, file) => {
                if (error === null && file.serverID !== null) {
                  setValue('models', [
                    ...getValues('models'),
                    { id: file.serverId, name: file.filename, old: true },
                  ]);
                }
              }}
              onupdatefiles={(fileItems) => {
                setModelFiles([
                  ...modelFiles,
                  fileItems.map((fileItem) => fileItem.file),
                ]);
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
              server={gltfFileInputServerConfig(
                getValues,
                initialModel?.model?.slug,
                initialModel?.user?.username
              )}
              files={gltfFiles}
              id="gltf"
              name="gltf"
              allowMultiple={true}
              errors={errors.gltf}
              onprocessfile={(error, file) => {
                if (error === null) {
                  setValue('gltf', [
                    ...getValues('gltf'),
                    { id: file.serverId, name: file.filename },
                  ]);
                }
              }}
              onremovefile={(error, file) => {
                if (error === null) {
                  setValue(
                    'gltf',
                    getValues('gltf').filter((img) => img.id !== file.serverId)
                  );
                }
              }}
              onaddfile={(error, file) => {
                if (error === null && file.serverId !== null) {
                  setValue('gltf', [
                    ...getValues('gltf'),
                    { id: file.serverId, name: file.filename, old: true },
                  ]);
                  if (file.filename.endsWith('.gltf')) {
                    getResourceFilesFromGltf(file.file);
                  }
                }
              }}
              onupdatefiles={(fileItems) => {
                setGltfFiles([
                  ...gltfFiles,
                  fileItems.map((fileItem) => fileItem.file),
                ]);
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
