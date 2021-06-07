import React, { useState } from 'react';
import { tw, apply } from 'twind/css';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import LoadingIndicator from 'components/loading-indicator/LoadingIndicator';
import Modal from 'components/modal/Modal';
import { deleteCollection } from 'api/collections.api';
import { Redirect } from 'react-router';
import { selectCurrentUserData } from 'state/selectors/users.selectors';

const buttonBaseStyles = tw`p-2 mt-2 text-white rounded`;
const greenButton = apply(buttonBaseStyles, `bg-green-600`);
const redButton = apply(
  buttonBaseStyles,
  `bg-red-600 min-w-1/2 flex items-center`
);

const CollectionDeleteModal = ({ onClose, slug }) => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const currentUser = useSelector(selectCurrentUserData);

  const onDelete = async () => {
    setLoading(true);
    const content = await deleteCollection(slug);
    if (content.success) {
      setLoading(false);
      setDeleted(true);
    }
  };

  return (
    <Modal
      onClose={onClose}
      addWindowClassNames="relative flex flex-col items-center"
    >
      <RiDeleteBin2Fill
        className={tw(
          'absolute -top-10 text-red-700 text-7xl bg-white rounded-full p-2'
        )}
      />
      <h1 className={tw`text-xl`}>This will delete the collection forever!</h1>
      <p className={tw`text-md`}>Are you sure you want to proceed?</p>
      <div className={tw`flex justify-between w-full`}>
        <button className={tw(greenButton)} onClick={onClose}>
          Go back
        </button>
        <button className={tw(redButton)} onClick={onDelete}>
          {loading ? (
            <>
              <span className={tw`mr-2`}>Deleting model</span>{' '}
              <LoadingIndicator size={4} accentColor="red" />
            </>
          ) : (
            'Yes, delete this collection!'
          )}
        </button>
        {deleted && (
          <Redirect to={`/collections/user/${currentUser?.username}`} />
        )}
      </div>
    </Modal>
  );
};

export default CollectionDeleteModal;
