import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { yupResolver } from '@hookform/resolvers/yup';

import { uploadModel } from '../../api/models.api';
import { jsonToFormData } from '../../utils/forms';
import FileInput from '../form/inputs/FileInput';
import Input from '../form/inputs/Input';
import SubmitButton from '../form/inputs/SubmitButton';
import Textarea from '../form/textarea/Textarea';
import { useTagsOptions } from './custom-hooks';
import { ModelFormSchema } from './validation.schema';
import Error from '../error/Error';
import { Redirect } from 'react-router';

function ModelForm() {
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(ModelFormSchema),
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    done: false,
    redirect: false,
    modelId: '',
  });

  const options = useTagsOptions();

  const onSubmit = async (data) => {
    setFormStatus({
      ...formStatus,
      loading: true,
    });
    try {
      data.tags = data.tags.map((tag) => tag.value);
      const formData = jsonToFormData(data);
      const { id } = await uploadModel(formData);
      setFormStatus({
        ...formStatus,
        loading: false,
        modelId: id,
        done: true,
      });
      setTimeout(() => {
        setFormStatus({
          ...formStatus,
          redirect: true,
        });
      }, 1500);
    } catch (e) {
      setFormStatus({
        ...formStatus,
        loading: false,
      });
    }
  };

  const buttonText = () => {
    if (formStatus.loading) {
      return 'Uploading...';
    }
    if (formStatus.done) {
      return 'Done!';
    }
    return 'Upload';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-8">
      <Input
        id="model-title"
        name="name"
        label="Name"
        register={register}
        required
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
        required
        errors={errors.description}
      />
      <FileInput
        id="images"
        name="images"
        label="Static images"
        accept="image/*"
        register={register}
        multiple
        errors={errors.images}
      />
      <FileInput
        id="models"
        name="models"
        label="3D files"
        accept=".stl"
        register={register}
        multiple
        errors={errors.models}
      />
      <label>Tags</label>
      <Controller
        options={options}
        isMulti
        name="tags"
        control={control}
        as={CreatableSelect}
        defaultValue={[]}
      />
      {errors.tags && <Error message={errors.tags.message} />}
      <SubmitButton
        text={buttonText()}
        className={`mt-5 ${formStatus.done && 'bg-green-500'}`}
      />
      {formStatus.redirect && <Redirect to={`/models/${formStatus.modelId}`} />}
    </form>
  );
}

export default ModelForm;
