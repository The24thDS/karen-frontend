import { useState, useMemo } from 'react';
import { tw, apply } from 'twind/css';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { selectCurrentUser } from 'state/selectors/users.selectors';
import Modal from 'components/modal/Modal';
import Select from 'components/form/inputs/Select';
import { addModelToCollection } from 'api/models.api';
import useUserCollectionsForModel from 'hooks/useUserCollectionsForModel';
import useUserCollections from 'hooks/useUserCollections';
import SubmitButton from 'components/form/inputs/SubmitButton';

const buttonBaseStyles = tw`p-2 mt-2 text-white rounded`;
const greenButton = apply(buttonBaseStyles, `bg-green-600`);

const ModelAddToCollectionModal = ({ onClose, slug }) => {
  const currentUser = useSelector(selectCurrentUser);

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const collections = useUserCollections(currentUser?.username);
  const userCollectionsForModel = useUserCollectionsForModel(
    currentUser?.username,
    slug,
    trigger
  );
  const selectOptions = useMemo(
    () =>
      collections
        .filter(
          (c) =>
            userCollectionsForModel.find((uc) => uc.slug === c.slug) ===
            undefined
        )
        .map((c) => ({ value: c.slug, name: c.name })),
    [collections, userCollectionsForModel]
  );
  const buttonText = useMemo(() => {
    if (loading) {
      return 'Submitting';
    }
    if (selectOptions.length === 0) {
      return 'No collections available';
    }
    return 'Submit';
  }, [loading, selectOptions]);

  const { register, handleSubmit } = useForm();

  const onAdd = async (data) => {
    console.log(data);
    setLoading(true);
    const content = await addModelToCollection(slug, data.collection);
    if (content.success) {
      setLoading(false);
      setAdded(true);
      setTrigger(trigger + 1);
    }
  };

  return (
    <Modal
      onClose={onClose}
      addWindowClassNames="relative flex flex-col items-center"
    >
      <h1 className={tw`text-xl`}>Add this model to a collection</h1>
      <form onSubmit={handleSubmit(onAdd)} className={tw(`w-full`)}>
        <Select
          id="collection"
          name="collection"
          label="Collection"
          options={selectOptions}
          register={register}
        />
        <SubmitButton
          classNames={tw(
            greenButton,
            'disabled:(opacity-25 cursor-default bg-black)'
          )}
          disabled={selectOptions.length === 0}
          text={buttonText}
        />
      </form>
      {added && 'Model was added to the collection'}
    </Modal>
  );
};

export default ModelAddToCollectionModal;
