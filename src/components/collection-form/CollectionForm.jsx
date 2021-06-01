import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import validationSchema from './validation.schema';

import Input from 'components/form/inputs/Input';
import Select from 'components/form/inputs/Select';
import SubmitButton from 'components/form/inputs/SubmitButton';
import Textarea from 'components/form/textarea/Textarea';
import { storeCollection, updateCollection } from 'api/collections.api';
import { useHistory } from 'react-router';

const CollectionForm = ({ initialValues, slug, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const isEditForm = useMemo(() => !!initialValues, [initialValues]);

  useEffect(() => {
    let mounted = true;
    if (isEditForm && mounted) {
      Object.keys(initialValues).forEach((key) =>
        setValue(key, initialValues[key])
      );
    }
    return () => {
      mounted = false;
    };
  }, [isEditForm, initialValues, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!isEditForm) {
      const response = await storeCollection(data, dispatch);
      setLoading(false);
      if (response?.success) {
        onClose();
        history.push(`/collections/${response.collection.slug}`);
      }
    } else {
      const response = await updateCollection(slug, data, dispatch);
      setLoading(false);
      if (response?.success) {
        onClose();
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="name"
        name="name"
        label="Name"
        register={register}
        errors={errors.name}
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        register={register}
        errors={errors.description}
      ></Textarea>
      <Select
        id="visibility"
        name="visibility"
        label="Visibility"
        options={['public', 'private']}
        register={register}
        errors={errors.visibility}
      />
      <SubmitButton text={loading ? 'Submitting...' : 'Submit'} />
    </form>
  );
};

export default CollectionForm;
