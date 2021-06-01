import ModelAddToCollectionModal from 'components/model/ModelAddToCollectionModal';
import ModelDeleteModal from 'components/model/ModelDeleteModal';
import ModelRemoveFromCollectionModal from 'components/model/ModelRemoveFromCollectionModal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectCurrentUserData } from 'state/selectors/users.selectors';
import { tw } from 'twind';

const ModelActionButtons = ({ user, slug }) => {
  const loggedInUser = useSelector(selectCurrentUserData);
  const location = useLocation();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [collectionAddModalOpened, setCollectionAddModalOpened] =
    useState(false);
  const [collectionRemoveModalOpened, setCollectionRemoveModalOpened] =
    useState(false);

  return (
    <div className="col-span-3 flex items-center text-sm">
      {loggedInUser !== null && (
        <>
          <button
            className={tw('bg-yellow-500 text-white p-1 rounded mr-2')}
            onClick={() => setCollectionAddModalOpened(true)}
          >
            Add to Collection
          </button>
          <button
            className={tw('bg-yellow-200 text-black p-1 rounded mr-2')}
            onClick={() => setCollectionRemoveModalOpened(true)}
          >
            Remove from Collection
          </button>
          {collectionAddModalOpened && (
            <ModelAddToCollectionModal
              onClose={() => setCollectionAddModalOpened(false)}
              slug={slug}
            />
          )}
          {collectionRemoveModalOpened && (
            <ModelRemoveFromCollectionModal
              onClose={() => setCollectionRemoveModalOpened(false)}
              slug={slug}
            />
          )}
        </>
      )}
      {loggedInUser?.username === user.username && (
        <>
          <Link
            className={tw('bg-blue-500 text-white p-1 rounded mr-2')}
            to={`${location.pathname}/edit`}
          >
            Edit Model
          </Link>
          <button
            className={tw('bg-red-500 text-white p-1 rounded')}
            onClick={() => setDeleteModalOpened(true)}
          >
            Delete Model
          </button>
          {deleteModalOpened && (
            <ModelDeleteModal
              onClose={() => setDeleteModalOpened(false)}
              slug={slug}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModelActionButtons;
