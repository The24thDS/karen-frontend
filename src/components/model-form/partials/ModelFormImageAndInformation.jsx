import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { tw } from 'twind';
import { Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import FileInput from '../../form/inputs/FileInput';
import Input from '../../form/inputs/Input';
import Textarea from '../../form/textarea/Textarea';
import Error from '../../error/Error';
import SubmitButton from '../../form/inputs/SubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useInitialModel,
  useInitialModelImages,
  useTagsOptions,
} from '../custom-hooks';
import { ModelFormSchemaStep1 } from '../validation.schema';
import { imagesFileInputServerConfig } from '../file-inputs-server-configs';

const ModelFormImageAndInformation = ({
  initialModel,
  sectionStyle,
  onButtonClick,
}) => {
  const { register, handleSubmit, control, errors, setValue, getValues } =
    useForm({
      resolver: yupResolver(ModelFormSchemaStep1),
    });
  const tagsOptions = useTagsOptions();
  useInitialModel(setValue, initialModel);
  const initialImages = useInitialModelImages(initialModel);
  const [images, setImages] = useState(initialImages);

  return (
    <form
      onSubmit={handleSubmit(onButtonClick)}
      className={tw`grid(& cols-1 lg:cols-2) gap-4 mt-8`}
    >
      <div>
        <p className={sectionStyle}>
          Choose images that will be displayed on your model's page
        </p>
        <Controller
          name="images"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <FileInput
              {...field}
              server={imagesFileInputServerConfig(
                getValues,
                initialModel?.model?.slug,
                initialModel?.user?.username
              )}
              files={images}
              id="images"
              name="images"
              allowMultiple={true}
              acceptedFileTypes={['image/*']}
              errors={errors.images}
              onprocessfile={(error, file) => {
                if (error === null) {
                  setValue('images', [
                    ...getValues('images'),
                    { id: file.serverId, name: file.filename },
                  ]);
                }
              }}
              onremovefile={(error, file) => {
                if (error === null) {
                  setValue(
                    'images',
                    getValues('images').filter(
                      (img) => img.id !== file.serverId
                    )
                  );
                }
              }}
              onaddfile={(error, file) => {
                if (error === null && file.serverId !== null) {
                  setValue('images', [
                    ...getValues('images'),
                    { id: file.serverId, name: file.filename, old: true },
                  ]);
                }
              }}
              onupdatefiles={(fileItems) => {
                setImages(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          )}
        />
      </div>
      <div>
        <p className={sectionStyle}>Add some information about your model</p>
        <Input
          id="model-title"
          name="name"
          label="Name"
          register={register}
          errors={errors.name}
        />
        <Textarea
          id="description"
          name="description"
          label="Description"
          rows={5}
          register={register}
          classNames={{
            textarea: 'text-sm',
          }}
          errors={errors.description}
        />

        <label>Tags</label>
        <Controller
          options={tagsOptions}
          isMulti
          name="tags"
          control={control}
          as={CreatableSelect}
          defaultValue={[]}
        />
        {errors.tags && <Error message={errors.tags.message} />}
        <SubmitButton text="Next" />
      </div>
    </form>
  );
};

ModelFormImageAndInformation.propTypes = {
  sectionStyle: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default ModelFormImageAndInformation;
