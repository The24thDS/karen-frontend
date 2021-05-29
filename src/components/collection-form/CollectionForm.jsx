import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import validationSchema from './validation.schema';

import Input from 'components/form/inputs/Input';
import Select from 'components/form/inputs/Select';
import SubmitButton from 'components/form/inputs/SubmitButton';
import Textarea from 'components/form/textarea/Textarea';

const CollectionForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // TODO: api call
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input id="name" name="name" label="Name" register={register} />
      <Textarea
        id="description"
        name="description"
        label="Description"
        register={register}
      ></Textarea>
      <Select
        id="visibility"
        name="visibility"
        label="Visibility"
        options={['public', 'private']}
        register={register}
      />
      <SubmitButton />
    </form>
  );
};

export default CollectionForm;
