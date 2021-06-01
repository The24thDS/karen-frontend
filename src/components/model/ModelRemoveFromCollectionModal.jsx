import { useState, useMemo } from 'react';
import { tw, apply } from 'twind/css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Modal from 'components/modal/Modal';
import Select from 'components/form/inputs/Select';
import { removeModelFromCollection } from 'api/models.api';
import {
  useUserCollections,
  useUserCollectionsForModel,
} from 'pages/collections/custom-hooks';
import { selectCurrentUserData } from 'state/selectors/users.selectors';
import SubmitButton from 'components/form/inputs/SubmitButton';

const buttonBaseStyles = tw`p-2 mt-2 text-white rounded`;
const greenButton = apply(buttonBaseStyles, `bg-green-600`);

const ModelRemoveFromCollectionModal = ({ onClose, slug }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUserData);

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const collections = useUserCollections(currentUser?.username, dispatch);
  const userCollectionsForModel = useUserCollectionsForModel(
    currentUser?.username,
    slug,
    dispatch,
    trigger
  );
  const selectOptions = useMemo(
    () =>
      collections
        .filter(
          (c) =>
            userCollectionsForModel.find((uc) => uc.slug === c.slug) !==
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
      return 'This model is not in any collection';
    }
    return 'Submit';
  }, [loading, selectOptions]);

  const { register, handleSubmit } = useForm();

  const onAdd = async (data) => {
    console.log(data);
    setLoading(true);
    const content = await removeModelFromCollection(
      slug,
      data.collection,
      dispatch
    );
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
      <h1 className={tw`text-xl`}>Remove this model from a collection</h1>
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
      {added && 'Model was removed from the collection'}
    </Modal>
  );
};

export default ModelRemoveFromCollectionModal;
